
import { agents } from '@/db/schema';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/ui/agents/server/procedure';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
 
});
// export type definition of API
export type AppRouter = typeof appRouter;