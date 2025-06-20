"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetMany, AgentGetOne } from "../types"
import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { CornerDownRight, CornerRightDown, CornerRightDownIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent name",
    cell:({row})=>
        (
             <div className=" flex flex-col gap-y-1">
            <div className=" flex items-center gap-x-2">
                  <h1>hello</h1>
                <GeneratedAvatar variant="botttsNeutral" seed={row.original.name} className="size-6"></GeneratedAvatar>
                <span className="">{row.original.name}</span>
            </div>
            <div className="flex items-center gap-x-2">
                <div className=" flex items-center gap-x-1">
                    <CornerDownRight className=" size-3 text-muted-foreground"></CornerDownRight>
                    <span className=" text-sm text-muted-foreground max-w-[200px] truncate capitalize">
                        {row.original.instructions}
                    </span>
                </div>
            </div>
         </div>
        )
            
       

    },

   {
     accessorKey:"meetingCount",
     header:"Meetings",
     cell: ({row})=>{
        return(
            <Badge variant="outline" className=" flex items-center gap-x-2 [&>svg]:size-4">
            <VideoIcon className="text-blue-700 ">
       
            </VideoIcon>
            {row.original.meetingCount} meetings
          </Badge>
        )
          
     }
   }
  
 
]