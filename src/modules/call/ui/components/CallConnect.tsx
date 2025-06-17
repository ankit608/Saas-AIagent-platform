import React, { useEffect, useState } from 'react'
import {Call, CallingState,  StreamCall, StreamVideo, StreamVideoClient} from "@stream-io/video-react-sdk"

import { useTRPC } from '@/app/trpc/client'
import { useMutation } from '@tanstack/react-query'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { LoaderIcon } from 'lucide-react'
import CallUi from '@/modules/meetings/components/CallUi'

interface Props{
 
    meetingId:string,
    meetingName: string,
    userId:string,
    userName: string,
    userImage: string

}

const CallConnect = ({meetingId,meetingName,userId,userName, userImage}:Props) => {
      console.log(userId,"userId")
    const trpc = useTRPC()
    const {mutateAsync: generateToken} = useMutation(
        trpc.meetings.generatedToken.mutationOptions()
    )

   
  
     const [client,setClient] = useState<StreamVideoClient>();

     useEffect(()=>{
        const _client = new StreamVideoClient({
             apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
             user: {
                 id:userId,
                 name:userName,
                 image: userImage,
             },
             tokenProvider: generateToken
        })

        setClient(_client)

        return ()=>{
            _client.disconnectUser();
            setClient(undefined)
        }
     },[userId,userName,userImage,generateToken]
    )
   const [Call,SetCall] = useState<Call>()

   useEffect(()=>{
     if(!client) return;
     const _call= client.call("default",meetingId)
     _call.camera.disable()
     _call.microphone.disable();
     SetCall(_call)

     return()=>{
         if(_call.state.callingState!== CallingState.LEFT){
             _call.leave();
             _call.endCall();
             SetCall(undefined)
         }
     }
   },[client,meetingId])
 
   if(!client || !Call){
     return(
        <div className=' flex h-screen items-center justify-center bg-radial from-sidebar-accent'>
            <LoaderIcon className=''></LoaderIcon>
        </div>
     )
   }

  return (
     <StreamVideo client={client}>
          <StreamCall call={Call}>
            <CallUi meetingName={meetingName}></CallUi>
          </StreamCall>
     </StreamVideo>
  )
}

export default CallConnect
