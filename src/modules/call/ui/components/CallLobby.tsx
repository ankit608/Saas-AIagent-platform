import React from 'react'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { DefaultVideoPlaceholder,StreamVideoParticipant,ToggleVideoPreviewButton,useCallStateHooks, VideoPreview,ToggleAudioPreviewButton } from '@stream-io/video-react-sdk'
import { Button } from '@/components/ui/button'
import Generateavatar from '@/lib/avatar'
import { authClient } from '@/lib/auth-client'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'
import { LogInIcon } from 'lucide-react'


interface Props{
     onjoin: ()=>void
}

const DisabledVideoPreview = () =>{
     const {data} = authClient.useSession();

     return(
        <DefaultVideoPlaceholder participant={{
             name:data?.user.name ??"",
              image:data?.user.image?? Generateavatar({
                 seed:data?.user.name??"",
                 variant: "initials"


              })
             
             } as StreamVideoParticipant}>

        </DefaultVideoPlaceholder>
     )
}

const AllowBrowserPermission = () =>{
     return(
        <p className='text-sm'>
            Please grantyour browser a permission to access your camera and microphone.
        </p>
     )
}

const CallLobby = ({onjoin}:Props) => {
    

    const {useCameraState , useMicrophoneState} = useCallStateHooks();
    const {hasBrowserPermission:hasMicPermission} = useMicrophoneState();
    const {hasBrowserPermission:hasCameraPermission} =  useCameraState()

    const hasBrowserPermission = hasCameraPermission && hasMicPermission;

  


  return (
    <div className=' flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar'>
      <div className='py-4 px-8 flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
            <div className='flex flex-col gap-y-2 text-center'>
                <h6>Ready to Join?</h6>
                <p className=' text-sm'> Set up your call before Joining</p>
            </div>
            <VideoPreview DisabledVideoPreview={hasCameraPermission?DisabledVideoPreview:AllowBrowserPermission}></VideoPreview>

            <div className=' flex gap-x-2'>
                <ToggleAudioPreviewButton></ToggleAudioPreviewButton>
                <ToggleVideoPreviewButton></ToggleVideoPreviewButton>
            </div>
            <div className='flex gap-x-2  justify-center w-full'>
                <Button asChild  variant="ghost">
                    <Link href="/meetings">
                    Cancel</Link>
                    </Button>

                     <Button asChild  variant="ghost" onClick={onjoin}>
                   <div>
                    <LogInIcon></LogInIcon>
                     Join Call
                   </div>
                    
                    
                    </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CallLobby
