
'use client'
import React, { useState } from 'react'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NewMeetingtDialouge from './NewMeetingDialouge'
import { DEFAULT_PAGE } from '@/constant'

const MeetingsHeader = () => {
  const [isDialogOpen,setisDialougeOpen] = useState(false)
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

          { true &&(
            <Button variant="outline" size="sm" onClick={()=>{}}>
              <XCircleIcon></XCircleIcon>
              Clear
            </Button>
          )}
        </div>
    </div>
    </>
  )
}

export default MeetingsHeader