import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/app/trpc/init";
import { db } from "@/db";
import { meetings } from "@/db/schema";

import { TRPCError } from "@trpc/server";
import { create } from "domain";

import z from 'zod'
import { equal } from "assert";
import { eq, getTableColumns, sql , and, ilike, desc, count} from "drizzle-orm";
import page from "@/app/(dashboard)/page";
import { Search } from "lucide-react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";




export const MeetingsRouter = createTRPCRouter({
     

     getOne: protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{
           const [existingMeeting] = await db.select({
                   meetingCount: sql<number> `5`,
              ...getTableColumns(meetings)
           }).from(meetings).where(and (eq(meetings.id,input.id), eq(meetings.userId,ctx.auth.user.id)))
              

           if(!existingMeeting){
                throw new TRPCError({code:"NOT_FOUND", message:"Meeting not found"})
           }
           return existingMeeting
     }),
     getMany: protectedProcedure.input(z.object({
          page:z.number().default(DEFAULT_PAGE),
          pageSize:z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
           search: z.string().nullish()

     }).optional()).query(async ({ctx,input})=>{
          const {search, page, pageSize} = input;
          console.log(search,page,pageSize)
        
          const data = await db.select({
               meetingCount: sql<number>`5`,
               ...getTableColumns(meetings)
          }).from(meetings).where(
               and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search?ilike(meetings.name,`${input?.search}%`): undefined,
               )
          ).orderBy(desc(meetings.createdAt),desc(meetings.id)).limit(pageSize).offset((page-1)*pageSize )

        

          const total = await db.select({count:count()}).from(meetings).where(
               and(eq(
                    meetings.userId, ctx.auth.user.id
               ),search?ilike(meetings.name, `%${search}%`):undefined)
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