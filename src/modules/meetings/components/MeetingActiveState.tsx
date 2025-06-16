import { EmptyState } from '@/components/ui/empty-state'
import { VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
    meetingId: string;
 
}
const MeetingActiveState = ({meetingId}:Props) => {
  return (
    <div className=' bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
      <EmptyState image='/upcoming.svg' title='Meeting is active' description='Meeting will end once all participants have left'></EmptyState>
         
        <div className=' flex flex-col-reverse lg:flex-row  lg:justify-center items-center gap-2 w-full'>
            <Link href = {`/call/${meetingId}`}>
               <VideoIcon></VideoIcon>
               Join Meeting
            </Link>
        </div>
    </div>


  )
}

export default MeetingActiveState
