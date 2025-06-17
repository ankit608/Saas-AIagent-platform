'use client'
import { useTRPC } from '@/app/trpc/client'
import { ErrorState } from '@/components/ui/error-state'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import CallProvider from '../components/CallProvider'
import CallConnect from '../components/CallConnect'

interface Props {
     meetingId: string
}

const CallView = ({meetingId}:Props) => {
    const trpc = useTRPC()

    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id: meetingId}))
    

    if(data.status==="completed"){
       return(
        <div className='flex  h-screen items-center justify-center'>
             <ErrorState title='Meeting has ended' description='you can no longer join this meeting'></ErrorState>
        </div>
       )  
    }

  return (
    <div>
        <CallProvider meetingId={meetingId} meetingName={data.name}></CallProvider>
    </div>
  )
}

export default CallView
