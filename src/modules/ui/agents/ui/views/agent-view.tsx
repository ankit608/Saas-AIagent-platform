"use client"

import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/app/trpc/client"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorState } from "@/components/ui/error-state"

export const AgentsView = () =>{
     const trpc = useTRPC()

     const{data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

     
     

     return(
        <div>{JSON.stringify(data,null,2)}</div>
     )
}