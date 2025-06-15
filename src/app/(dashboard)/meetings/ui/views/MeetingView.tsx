'use client'

import { useTRPC } from "@/app/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/modules/ui/agents/components/data-table";
import { columns } from "@/modules/meetings/components/Column";
import { EmptyState } from "@/components/ui/empty-state";

export const MeetingView = () =>{
     const trpc = useTRPC();
     const {data} =  useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))


     return (

         <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns}></DataTable>
            {data.items.length===0&&(
             <EmptyState title="Create Your first meeting" description="Create an agent to join meetings. Each agent will follow your instructions and can interact with participants during call"></EmptyState>
            )}
         </div>
     )
}

