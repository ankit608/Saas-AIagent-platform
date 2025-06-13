import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/app/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";

import { TRPCError } from "@trpc/server";
import { create } from "domain";
import { agentInsertSchema } from "../schema";
import z from 'zod'
import { equal } from "assert";
import { eq, getTableColumns, sql , and, ilike, desc, count} from "drizzle-orm";
import page from "@/app/(dashboard)/page";
import { Search } from "lucide-react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";


export const agentsRouter = createTRPCRouter({
     getOne: protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{
           const [existingAgent] = await db.select({
                   meetingCount: sql<number> `5`,
              ...getTableColumns(agents)
           }).from(agents).where(and (eq(agents.id,input.id), eq(agents.userId,ctx.auth.user.id)))
              

           if(!existingAgent){
                throw new TRPCError({code:"NOT_FOUND", message:"agent not found"})
           }
           return existingAgent
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
               ...getTableColumns(agents)
          }).from(agents).where(
               and(
                    eq(agents.userId, ctx.auth.user.id),
                    search?ilike(agents.name,`${input?.search}%`): undefined,
               )
          ).orderBy(desc(agents.createdAt),desc(agents.id)).limit(pageSize).offset((page-1)*pageSize )

        

          const total = await db.select({count:count()}).from(agents).where(
               and(eq(
                    agents.userId, ctx.auth.user.id
               ),search?ilike(agents.name, `%${search}%`):undefined)
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
    create: protectedProcedure
  .input(agentInsertSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.auth?.user?.id;
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Missing user ID in session" });
    }

    const { name, instructions } = input;

    const [createdAgent] = await db.insert(agents).values({
      name,
      instructions,
      userId, // from validated session
    }).returning(); // remove if using SQLite

    return createdAgent;
  }),

})