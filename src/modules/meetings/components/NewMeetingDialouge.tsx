 import React from 'react'
 import ResponSiveDialog from '@/components/ui/ResponsiveDialog'
 import MeetingForm from './MeetingForm';
import { Flag } from 'lucide-react';
import { useRouter } from 'next/navigation';
 
 interface NewMeetingDialougeProps{
     open:boolean;
      onOpenChange: (open:boolean) => void;
 }
 
 const NewMeetingtDialouge = ({open,onOpenChange}:NewMeetingDialougeProps) => {

    const router = useRouter()
   return (
       <ResponSiveDialog title="new Meeting" description='Create a new Meeting'open={open} onOpenChange={onOpenChange}>
         <MeetingForm onSuccess={(id)=>{
             onOpenChange(false)
             router.push(`/meetings/${id}`)
         }}
         
         onCancel={()=>onOpenChange}></MeetingForm>
       </ResponSiveDialog>
   )
 }
 
 export default NewMeetingtDialouge
 