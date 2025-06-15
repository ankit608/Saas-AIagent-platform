'use client'

import { useTRPC } from "@/app/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/modules/ui/agents/components/data-table";
import { columns } from "@/modules/meetings/components/Column";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";
import UseMeeting from "@/modules/meetings/components/hooks/UseMeeting";
import DataPagination from "@/modules/ui/agents/components/DataPagination";

export const MeetingView = () =>{
     const trpc = useTRPC();
    
     const router = useRouter();
     const [filter,setFilter] = UseMeeting()
      const {data} =  useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filter
     }))
    


     return (

         <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} onRowClick={(row)=>router.push(`/meetings/${row.id}`)}></DataTable>
             <DataPagination totalPages={data.totalPages} page={filter.page} onPageChange={(page)=>{{setFilter({page})}}}></DataPagination>
            {data.items.length===0&&(
             <EmptyState title="Create Your first meeting" description="Create an agent to join meetings. Each agent will follow your instructions and can interact with participants during call"></EmptyState>
            )}
         </div>
     )
}

