import React from 'react'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getQueryClient } from '@/app/trpc/server';
import { trpc } from '@/app/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import MeetingIdview, { MeetingErrorState, MeetingLoadingState } from '@/modules/meetings/components/MeetingIdview';
interface Props {
     params: Promise<{
        meetingId: string
     }>;
}


const page = async({params}:Props) => {
    const {meetingId} = await params;
    const session = await auth.api.getSession({
         headers: await headers()
    })

    if(!session){
         redirect("/sign-in")
    }

    const queryClient =  getQueryClient();
     void queryClient.prefetchQuery((
         trpc.meetings.getOne.queryOptions({id:meetingId})
     ))
  return (
    
      <HydrationBoundary>
        <Suspense fallback={<MeetingLoadingState></MeetingLoadingState>}>
            <ErrorBoundary fallback= {<MeetingErrorState></MeetingErrorState>}>
                  <MeetingIdview meetingId={meetingId}></MeetingIdview>
            </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
  )
}

export default page
