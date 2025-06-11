import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/app/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";

import { TRPCError } from "@trpc/server";
import { create } from "domain";
import { agentInsertSchema } from "../schema";
import z from 'zod'
import { equal } from "assert";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
     getOne: protectedProcedure.input(z.object({id:z.string()})).query(async({input})=>{
           const [existingAgent] = await db.select({
                   meetingCount: sql<number> `5`,
              ...getTableColumns
           }).from(agents).where(eq(agents.id,input.id))

           return existingAgent
     }),
     getMany: protectedProcedure.query(async ()=>{
          const data = await db.select().from(agents)
          
          await new Promise((resolve)=>setTimeout(resolve,2000))

        // throw new TRPCError({code: "BAD_REQUEST"})

           return data
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