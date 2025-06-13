 import React from 'react'
 import ResponSiveDialog from '@/components/ui/ResponsiveDialog'
 import AgentForm from './AgentForm';
import { Flag } from 'lucide-react';
import { AgentGetOne } from '../types';
 
 interface UpdateAgaentDialougeProps{
     open:boolean;
      onOpenChange: (open:boolean) => void;
      initialValues: AgentGetOne;
 }
 
 const UpdateAgaentDialouge = ({open,onOpenChange,initialValues}:UpdateAgaentDialougeProps) => {
   return (
       <ResponSiveDialog title="Edit Agent" description='Edit the agent details'open={open} onOpenChange={onOpenChange}>
         <AgentForm onSuccess={()=>onOpenChange(false)} onCancel={()=>{onOpenChange(false)}} initialsValues={initialValues}></AgentForm>
       </ResponSiveDialog>
   )
 }
 
 export default UpdateAgaentDialouge