
'use client'
import React, { useState } from 'react'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NewMeetingtDialouge from './NewMeetingDialouge'
import MeetingSearchFilter from './MeetingFilter'
import { DEFAULT_PAGE } from '@/constant'
import { MeetingStatus } from '../types'
import { StatusFilter } from './meetingStatusFilter'
import MeetingAgentIdFilter from './MeetingAgentFilter'
import UseMeeting from './hooks/UseMeeting'

const MeetingsHeader = () => {
  const [isDialogOpen,setisDialougeOpen] = useState(false)
  const [filters, setFilter] = UseMeeting()

  const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId

  const onClearFilters = ()=>{
     setFilter({
         status:null,
         agentId: "",
         search: "",
         page: 1
        
        })
  }
    return (
    <>
    <NewMeetingtDialouge open={isDialogOpen} onOpenChange={setisDialougeOpen}></NewMeetingtDialouge>
    <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className=' flex items-center justify-between'>
            <h5 className='font-medium'>My Meetings</h5>
            <Button onClick={()=>{setisDialougeOpen(true)}}>
              <PlusIcon></PlusIcon>
              New Meeting
            </Button>
        </div>
        <div className=' flex  items-center gap-2-x p-1'>

          <MeetingSearchFilter></MeetingSearchFilter>
           <StatusFilter></StatusFilter>
           <MeetingAgentIdFilter></MeetingAgentIdFilter>
           {isAnyFilterModified && (
            <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon>
                 
                </XCircleIcon>
                Clear
            </Button>
           )}
        </div>
    </div>
    </>
  )
}

export default MeetingsHeader