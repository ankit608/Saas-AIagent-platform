
import { agents } from '@/db/schema';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/ui/agents/server/procedure';
import { MeetingsRouter } from '@/modules/meetings/procedures';
export const appRouter = createTRPCRouter({
  meetings: MeetingsRouter,
  agents: agentsRouter,
 
});
// export type definition of API
export type AppRouter = typeof appRouter;