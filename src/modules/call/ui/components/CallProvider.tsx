'use client'
import React from 'react'
import { Loader2Icon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import CallConnect from './CallConnect';
import Generateavatar from '@/lib/avatar';

interface Props{
     meetingId: string,
     meetingName: string
}
const CallProvider =  ({meetingId,meetingName}:Props) => {
  
    const {data,isPending} =  authClient.useSession();



    console.log(data?.user.id,"sdfjsdlfjl")

    if(!data || isPending){
        return(
             <div className=' flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
            <Loader2Icon className='size-4 animate-spin text-white'></Loader2Icon>
         </div>
        )
        
    }
  
    return (
    <div>
        <CallConnect meetingId={meetingId} meetingName={meetingName} userId={data?.user.id} userName={data?.user.name} userImage={data?.user.image ?? Generateavatar({seed: data?.user.name || "A",variant:"initials"})}></CallConnect>
    </div>
  )
}

export default CallProvider
