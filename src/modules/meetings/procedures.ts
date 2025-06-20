import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/app/trpc/init";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";

import { TRPCError } from "@trpc/server";
import { create } from "domain";

import z from 'zod'
import { equal } from "assert";
import { eq, getTableColumns, sql , and, ilike, desc, count} from "drizzle-orm";
import page from "@/app/(dashboard)/page";
import { Search } from "lucide-react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
import { meetingsInsertSchema } from "./schema";
import { meetingsUpdateSchema } from "./schema";
import { MeetingStatus } from "./types";
import { streamvideo} from "@/lib/stream-video";
import Generateavatar from "@/lib/avatar";




export const MeetingsRouter = createTRPCRouter({
      
          generatedToken: protectedProcedure.mutation(async({ctx})=>{
              await streamvideo.upsertUsers([
                 {
                    id : ctx.auth.user.id,
                    name: ctx.auth.user.name,
                    role:  "admin",
                    image: ctx.auth.user.image?? Generateavatar({seed: ctx.auth.user.name, variant:"initials"})
                 }

              ])

              const expirationTime = Math.floor(Date.now()/1000)+600;
              const issuedAt = Math.floor(Date.now()/1000)-60
              const token = streamvideo.generateUserToken({
               user_id: ctx.auth.user.id,
               exp: expirationTime,
               validity_in_seconds: issuedAt
              })
              return token
          }),
         update:protectedProcedure.input(meetingsUpdateSchema)
         .mutation(async({ctx,input})=>{
             const updateMeeting = await db.update(meetings).set(input).where(and(eq(meetings.id,input.id), eq(meetings.userId,ctx.auth.user.id))).returning()

             if(!updateMeeting){
                 throw new TRPCError({
                     code: "NOT_FOUND",
                     message:" Meeting does not exist"
                 })
             }

             return updateMeeting
         }),
           remove:protectedProcedure.input(z.object({
            id:z.string()
           }))
         .mutation(async({ctx,input})=>{
             const [RemovedMeeting] = await db.delete(meetings).where(and(eq(meetings.id,input.id), eq(meetings.userId,ctx.auth.user.id))).returning()

             if(!RemovedMeeting){
                 throw new TRPCError({
                     code: "NOT_FOUND",
                     message:" Meeting does not exist"
                 })
             }

             return RemovedMeeting
         }),

     create: protectedProcedure.input(meetingsInsertSchema).mutation(async({input,ctx})=>{
        console.log("helloo")
        console.log(input,)
         const createdMeeting = await db.insert(meetings).values({
             ...input,
            userId:ctx.auth.user.id
         }).returning()
         
          console.log(createdMeeting)
          const call = streamvideo.video.call("default", createdMeeting[0].id)
          console.log(createdMeeting.indexOf,"MeetingIndexOf")
          await call.create({
               data:{
                    created_by_id: ctx.auth.user.id,
                    custom:{
                          meetingId: createdMeeting[0].id,
                          meetingName: createdMeeting[0].name,
                    },

                    settings_override:{
                         transcription:{
                               language:"en",
                               mode: "auto-on",
                               closed_caption_mode:"auto-on"

                         },

                         recording:{
                               mode: "auto-on",
                               quality: "1080p"
                         }
                    }
               }
          })

          const existingAgent = await db.select().from(agents).where(eq(agents.id, createdMeeting[0].agentId))
          console.log(existingAgent,"fjsdlfhjsdjhf")

          if(!existingAgent){
                throw new TRPCError({
                     code: "NOT_FOUND",
                     message: "Agent not found",
          
                })
          } 
                
          console.log(existingAgent,"existingAgent")
          await streamvideo.upsertUsers([
               {
                    id: existingAgent[0].id,
                    name: existingAgent[0].name,
                    role: "user",
                    image:Generateavatar({seed: existingAgent[0].name, variant:"botttsNeutral"}) 
               }
          ])
         return createdMeeting
     }),

     getOne: protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{
           const [existingMeeting] = await db.select({
                   meetingCount: sql<number> `5`,
              ...getTableColumns(meetings),
              agent: agents,
              duration: sql<number>`EXTRACT(EPOCH FROM(ended_at-started_at))`.as("duration"),
           
           }).from(meetings).innerJoin(agents, eq(meetings.agentId,agents.id)).where(and (eq(meetings.id,input.id), eq(meetings.userId,ctx.auth.user.id)))
              

           if(!existingMeeting){
                throw new TRPCError({code:"NOT_FOUND", message:"Meeting not found"})
           }
           return existingMeeting
     }),
     getMany: protectedProcedure.input(z.object({
           page: z.number().default(DEFAULT_PAGE),
  pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
  agentId: z.string().nullish(),
  status: z.enum([
    MeetingStatus.Upcoming,
    MeetingStatus.Processing,
    MeetingStatus.Completed,
    MeetingStatus.Cancelled,
    MeetingStatus.Active
           ]).nullish()

     }).optional()).query(async ({ctx,input})=>{
          const { search,  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE, status, agentId} = input ?? {};;
          console.log(page,pageSize)
        
          const data = await db.select({
               meetingCount: sql<number>`5`,
               ...getTableColumns(meetings),
               agent: agents,
               duration: sql<number>`EXTRACT(EPOCH FROM(ended_at-started_at))`.as("duration"),
          }).from(meetings).innerJoin(agents,eq(meetings.agentId, agents.id)).where(
               and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search?ilike(meetings.name,`${input?.search}%`): undefined,
                    status? eq(meetings.status,status):undefined,
                    agentId? eq(meetings.agentId,agentId):undefined
               )
          ).orderBy(desc(meetings.createdAt),desc(meetings.id)).limit(pageSize).offset((page-1)*pageSize )

        

          const total = await db.select({count:count()}).from(meetings).innerJoin(agents,eq(meetings.agentId, agents.id)).where(
               and(eq(
                    meetings.userId, ctx.auth.user.id
               ),
               search?ilike(meetings.name, `%${search}%`):undefined,
                 status? eq(meetings.status,status):undefined,
                    agentId? eq(meetings.agentId,agentId):undefined
            
            ),
              
               
          );
          
           console.log(total,"totall")

          const totalPages = Math.ceil(total[0].count/pageSize)
          console.log(total[0].count, totalPages)
          return{
                items: data,
                total: total[0].count,
                totalPages,
          }

       

           
     }),
  

})