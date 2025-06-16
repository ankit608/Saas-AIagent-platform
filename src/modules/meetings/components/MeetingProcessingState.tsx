import { EmptyState } from '@/components/ui/empty-state'
import React from 'react'

const MeetingProcessingState = () => {
  return (
    <div>
       <div>
            <div className=' bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
            <EmptyState image='/upcoming.svg' title='Meeting Completed' description='This meeting was Completed Summary will appear soon'></EmptyState>
               
          </div>
          </div>
    </div>
  )
}

export default MeetingProcessingState
