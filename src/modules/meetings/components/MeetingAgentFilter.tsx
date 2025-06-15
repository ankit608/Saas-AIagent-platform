import React from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/app/trpc/client'
import CommandSelect from '@/components/CommandSelect'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'
import UseMeeting from './hooks/UseMeeting'
const MeetingAgentIdFilter = () => {

    const [filter,setFilter] =  UseMeeting()

    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const {data} = useQuery(
         trpc.agents.getMany.queryOptions({
             pageSize:100,
             search:agentSearch
         })
    )
  return (
    <div>
      <CommandSelect classname='h-9' placeholder='Agent' options={(data?.items??[]).map((agent)=>{
         return(
            {
                id: agent.id,
                value: agent.id,
                children:(
                     <div className=' flex items-center gap-x-2'>
                        <GeneratedAvatar seed = {agent.name} variant='botttsNeutral' className='size-4'></GeneratedAvatar>
                        {agent.name}
                     </div>
                )
            }
         )
      })}
        onSelect={(value)=> setFilter({agentId:value})}
        onSearch={setAgentSearch}
      
      value={filter.agentId??""}></CommandSelect>
    </div>
  )
}

export default MeetingAgentIdFilter
