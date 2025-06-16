import { EmptyState } from '@/components/ui/empty-state'
import { VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MeetingCancelState = () => {
  return (
    <div>
      <div className=' bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
      <EmptyState image='/upcoming.svg' title='Meeting cancelled' description='This meeting was cancelled'></EmptyState>
         
    </div>
    </div>
  )
}

export default MeetingCancelState
