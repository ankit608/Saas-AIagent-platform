import React, { Suspense } from 'react'
import { MeetingView } from './ui/views/MeetingView'
import { getQueryClient,trpc } from '@/app/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import MeetingsHeader from '@/modules/meetings/components/MeetingsListHeaders';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';



const page = async () => {

    const session = auth.api.getSession({
         headers: await headers()
    })

    if(!session){
         redirect("/sign-in")
    }

const  queryClient = getQueryClient();

void queryClient.prefetchQuery(
     trpc.meetings.getMany.queryOptions({})
)
  return (
    <div>
        <MeetingsHeader></MeetingsHeader>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingViewLoading></MeetingViewLoading>} >
                 <ErrorBoundary fallback={<MeetingViewError></MeetingViewError>}>
                     <MeetingView></MeetingView>
                 </ErrorBoundary>
                
            </Suspense>
         
          </HydrationBoundary>
    </div>
  )
}


export const MeetingViewLoading = () =>{
    return (
      <LoadingState title="Loading Agents" description="This may take Few seconds"></LoadingState>
    )
}


export const MeetingViewError = () =>{
    return (
        <ErrorState title="Error Loading Agents" description="Something went wrong"></ErrorState>
    )
}
export default page
