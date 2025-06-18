import React, { useState } from 'react'
import { StreamTheme,useCall } from '@stream-io/video-react-sdk'
import CallLobby from '@/modules/call/ui/components/CallLobby'
import CAllActive from '@/modules/call/ui/components/CAllActive'
import CallEnded from '@/modules/call/ui/components/CallEnded'
interface Props {
 
     meetingName: string
}

const CallUi = ({meetingName}:Props) => {
    const call = useCall()
   const [show,setShow] = useState<"lobby"|"call"|"ended">("lobby")

   const handleJoin = async()=>{
     if(!call) return;
     const a =await call.join();
     console.log(a,"see the call join")

     setShow("call");
   }

   const handleLeave = () =>{
     if(!call)return;
     call.endCall()
     setShow("ended")
   }
  return (
    <div>
      <StreamTheme  className='h-full'>
        {show==="lobby" && <CallLobby onjoin={handleJoin}></CallLobby>}
             {show==="call" && <CAllActive onLeave={handleLeave} meetingName={meetingName}></CAllActive>}
                  {show==="ended" && <CallEnded></CallEnded>}
      </StreamTheme>
    </div>
  )
}

export default CallUi
