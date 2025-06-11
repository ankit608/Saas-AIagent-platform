"use client"

import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/app/trpc/client"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorState } from "@/components/ui/error-state"
import ResponSiveDialog from "@/components/ui/ResponsiveDialog"
import { Button } from "@/components/ui/button" 
import { DataTable } from "../../components/data-table"
import {columns} from "../../components/Columns"
import { EmptyState } from "@/components/ui/empty-state"




export const AgentsView = () =>{
     const trpc = useTRPC()

     const{data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

     console.log(data,"sldfhsdkl")
     

     return(
        <div className=" flex-1 pd-4 px-4 md:px-8 flex flex-col gap-y-4">
      
        <DataTable data={data} columns={columns}></DataTable>

        {data.length===0 && (
            <EmptyState title="create your first agent" description="Create an agent in your meeting.Each agent will follow your instruction and can Interact with participants during the call"></EmptyState>
        )}
        </div>
     )
}