
import { getQueryClient, trpc} from "@/app/trpc/server"
import { LoadingState } from "@/components/ui/loading-state";
import { AgentsView } from "@/modules/ui/agents/ui/views/agent-view"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"
import { ErrorState } from "@/components/ui/error-state";
import AgentHeader from "@/modules/ui/agents/components/AgentHeader";

const page = async() =>{

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return(
        <>
         <AgentHeader></AgentHeader>
        <HydrationBoundary state={dehydrate(queryClient)}>
             <Suspense fallback={<LoadingState title="Loading Agents" description="wait for few seconds..."></LoadingState>}>
                 <ErrorBoundary fallback={  <ErrorState title='Error Loading Agents' description='Something went wrong'></ErrorState> }>
                    <AgentsView></AgentsView>
                 </ErrorBoundary>
                 
             </Suspense>
             
        </HydrationBoundary>
        </>

       
        
    )
}

export default page

