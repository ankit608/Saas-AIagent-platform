 import React from 'react'
 import ResponSiveDialog from '@/components/ui/ResponsiveDialog'
 import AgentForm from './AgentForm';
import { Flag } from 'lucide-react';
 
 interface NewAgaentDialougeProps{
     open:boolean;
      onOpenChange: (open:boolean) => void;
 }
 
 const NewAgaentDialouge = ({open,onOpenChange}:NewAgaentDialougeProps) => {
   return (
       <ResponSiveDialog title="new Agent" description='Create a new agent'open={open} onOpenChange={onOpenChange}>
         <AgentForm onSuccess={()=>onOpenChange(false)} onCancel={()=>{onOpenChange(false)}}></AgentForm>
       </ResponSiveDialog>
   )
 }
 
 export default NewAgaentDialouge
 