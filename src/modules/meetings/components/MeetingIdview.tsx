'use client'
import { useTRPC } from '@/app/trpc/client';
import { useSuspenseQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import React, { useState } from 'react'
import MeetingIdViewHeader from './MeetingIdViewHeader';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';
import UpdateMeetingtDialouge from './UpdateMeetingDialoge';
import UpcomingState from './UpcomingState';
import MeetingActiveState from './MeetingActiveState';
import MeetingCancelState from './MeetingCancelState';
import MeetingProcessingState from './MeetingProcessingState';
import CompletedState from './CompltedState';

interface Props{
     meetingId: string;
}

const MeetingIdview = ({meetingId}:Props) => {
    const trpc = useTRPC();
    const router = useRouter()
    const queryClient = useQueryClient()
    const {data} = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id:meetingId})
    )
   
    const [updateMeetingDialoge, setupdateMeetingDialiuge] = useState(false)
    const [RemoveConfirmation,confirmRemove] = useConfirm("Are you sure?","The following action will remove this meeting")

    
    const  removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
             onSuccess:()=>{
                     queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                     router.push("/meetings")
             },

            //  onError:(error)=>{
            //      toast.error(error.data.)
            //  }
        })
    )

    const handleRemoveMeeting = async() =>{
        console.log("remove meeting")
         const ok = await confirmRemove();

         if(!ok) return

         await removeMeeting.mutateAsync({id:meetingId})
    }
     
    const isActive = data.status === "active"
    const isUpcoming = data.status ==="upcoming"
    const isCancelled = data.status === "cancelled"
    const isCompleted = data.status === "completed"
    const isProcessing = data.status === "processing"

  return (
    <>
   <UpdateMeetingtDialouge open ={updateMeetingDialoge}  onOpenChange={setupdateMeetingDialiuge} inititalValue={data} ></UpdateMeetingtDialouge> 
     <RemoveConfirmation></RemoveConfirmation>
      <div className='flex-2 py-4 px-4 mdpx-8 flex flex-col gap-y-4'>
       
        <MeetingIdViewHeader meetingId={meetingId} meetingName={data.name} onEdit={()=>{setupdateMeetingDialiuge(true)}} onRemove={()=>{handleRemoveMeeting()}}></MeetingIdViewHeader>
           {isCancelled && <MeetingCancelState></MeetingCancelState>}
            {isProcessing &&  <MeetingProcessingState></MeetingProcessingState> }
             {isCompleted &&  <CompletedState data={data}></CompletedState>}
             {isActive&& <MeetingActiveState meetingId={meetingId} ></MeetingActiveState>}
              {isUpcoming && <div><UpcomingState meetingId={meetingId} onCancelMeeting={()=>{}} isCancelling={false}></UpcomingState></div>}
    </div>
    </>
   
  )
}

export default MeetingIdview


export const MeetingLoadingState = () =>{
      
    return(
         <LoadingState title='Loading Meeting'  description='This may take few seconds'></LoadingState>
    )
}


export const MeetingErrorState = () =>{
      
    return(
         <ErrorState title='Error Loading Meeting'  description='please try later'></ErrorState>
    )
}