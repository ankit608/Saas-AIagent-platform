 import React from 'react'
 import ResponSiveDialog from '@/components/ui/ResponsiveDialog'
 import MeetingForm from './MeetingForm';
import { Flag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MeetingGetOne } from '../types';
 
 interface UpdateMeetingDialougeProps{
     open:boolean;
      onOpenChange: (open:boolean) => void;
      inititalValue: MeetingGetOne;
 }
 
 const UpdateMeetingtDialouge = ({open,onOpenChange,inititalValue}:UpdateMeetingDialougeProps) => {

    const router = useRouter()
   return (
       <ResponSiveDialog title="Edit Meeting" description='Edit the meeting details'open={open} onOpenChange={onOpenChange}>
         <MeetingForm onSuccess={(id)=>{
             onOpenChange(false)
           
         }}
         
         onCancel={()=>onOpenChange(false)}
          initialsValues={inititalValue}
         ></MeetingForm>
       </ResponSiveDialog>
   )
 }
 
 export default UpdateMeetingtDialouge
 