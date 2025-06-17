import React from 'react'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { DefaultVideoPlaceholder,StreamVideoParticipant,ToggleVideoPreviewButton,useCallStateHooks, VideoPreview,ToggleAudioPreviewButton } from '@stream-io/video-react-sdk'
import { Button } from '@/components/ui/button'
import Generateavatar from '@/lib/avatar'
import { authClient } from '@/lib/auth-client'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'
import { LogInIcon } from 'lucide-react'


const CallEnded= () => {
    

    const {useCameraState , useMicrophoneState} = useCallStateHooks();
    const {hasBrowserPermission:hasMicPermission} = useMicrophoneState();
    const {hasBrowserPermission:hasCameraPermission} =  useCameraState()

    const hasBrowserPermission = hasCameraPermission && hasMicPermission;

  


  return (
    <div className=' flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar'>
      <div className='py-4 px-8 flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
            <div className='flex flex-col gap-y-2 text-center'>
                <h6>You have ended the call</h6>
                <p className=' text-sm'> Summary will appear in few minutes</p>
            </div>
            <Button asChild>
                <Link href="/meetings">Back to Meetings</Link>
            </Button>
            
        </div>
      </div>
    </div>
  )
}

export default CallEnded
