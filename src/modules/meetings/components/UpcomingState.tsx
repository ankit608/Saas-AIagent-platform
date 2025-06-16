import { EmptyState } from '@/components/ui/empty-state'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { VideoIcon,BanIcon } from 'lucide-react'

interface Props {
    meetingId: string;
    onCancelMeeting: ()=>void;
    isCancelling: boolean
}

const UpcomingState = ({meetingId,onCancelMeeting,isCancelling}:Props) => {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flaex flex-col gap-y-8 items-center justify-center'>
      <EmptyState title='Upcoming Meetings' description='All your upcoming meetings will displayed here'>
      
      </EmptyState>
      <div className=' flex  flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>
        <Button variant="secondary" className='w-full lg:w-auto' disabled={isCancelling}>
            <BanIcon> Cancel meeting</BanIcon>
        </Button>

        
         <Button asChild className=' w-full lg:w-auto' disabled={isCancelling}>

            <Link href={`/call/${meetingId}`}>
                    <VideoIcon></VideoIcon>
            Start meeting</Link>
         
        </Button>
      
         
      </div>
    </div>
  )
}

export default UpcomingState
