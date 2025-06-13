'use client'
import { useTRPC } from '@/app/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'

import React from 'react'
import AgentIdViewHeader from './AgentIdViewHeader'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'
import { Badge } from '@/components/ui/badge'
import { VideoIcon } from 'lucide-react'
interface Props {
     agentId: string
}

const AgentIdView = ({agentId}:Props) => {
   const trpc = useTRPC()
   const {data} = useSuspenseQuery(trpc.agents.getOne.queryOptions({id:agentId}))
    return (
    <div className=' flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
            <AgentIdViewHeader agentId={agentId} agentName={data.name} onEdit={() => { } } onRemove={() => { } }></AgentIdViewHeader>
    
     <div className=' bg-white rounded-lg border'>
        <div className=' px-4 py-5 gap-y-5 flex flex-col col-span-5'>
            <div className=' flex items-center gap-x-3'>
                <GeneratedAvatar variant="botttsNeutral"  seed={data.name}  className='size-10'></GeneratedAvatar>
                <h2 className='text-2xl font-medium '> {data.name}</h2>
            </div>
            <Badge variant="outline" className='flex items-center gap-x-2 [&>svg]:size-4'> 
              <VideoIcon className='text-blue-700'></VideoIcon>
             {data.meetingCount} {data.meetingCount === 1 ? "meeting": 
             "meetings"}
            </Badge>
            <div className=' flex flex-col gap-y-4'>
                <p className='text-lg font-medium'>Instruction</p>
                <p className='text-neutral-800'>{data.instructions}</p>
            </div>
        </div>
     </div>
    </div>
  )
}

export const AgentsIdViewLoading = ({agentId}:Props) =>{
    return (
      <><LoadingState title="Loading Agents" description="This may take Few seconds"></LoadingState>
  
      
      </>
    )
}


export const AgentsIdViewError = () =>{
    return (
        <ErrorState title="Error Loading Agents" description="Something went wrong"></ErrorState>
    )
}
export default AgentIdView
