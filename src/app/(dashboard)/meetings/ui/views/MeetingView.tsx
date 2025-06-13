'use client'

import { useTRPC } from "@/app/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView = () =>{
     const trpc = useTRPC();
     const {data} =  useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))


     return (

         <div>
            {JSON.stringify(data)}
         </div>
     )
}

