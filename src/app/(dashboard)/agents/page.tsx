
import { getQueryClient, trpc} from "@/app/trpc/server"
import { LoadingState } from "@/components/ui/loading-state";
import { AgentsView } from "@/modules/ui/agents/ui/views/agent-view"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"
import { ErrorState } from "@/components/ui/error-state";
import AgentHeader from "@/modules/ui/agents/components/AgentHeader";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/ui/agents/params";
import { filterFns } from "@tanstack/react-table";

interface Props {
     searchParams:Promise<SearchParams>
}

const page = async({searchParams}: Props) =>{
   
    const session = await auth.api.getSession({
        headers:await headers(),
    })
         
    const filters = await loadSearchParams(searchParams)
       console.log(filters,"filtel")
    const queryClient = getQueryClient();
       
 
    
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))
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

