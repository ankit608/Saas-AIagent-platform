import React, { useState } from 'react';
import { z } from 'zod';

import { AgentGetOne } from '@/modules/ui/agents/types';
import { useTRPC } from '@/app/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  meetingsInsertSchema } from '../schema';
import CommandSelect from '@/components/CommandSelect';
import { agentInsertSchema } from '@/modules/ui/agents/schema';

import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
 import { MeetingGetOne } from '../../meetings/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { set } from 'date-fns';
import NewAgaentDialouge from '@/modules/ui/agents/components/NewAgaentDialouge';

interface MeetingFormProps {
  onSuccess?: (id?:string) => void;
  onCancel?: () => void;
  initialsValues?: MeetingGetOne;
}

const MeetingForm = ({ onSuccess, onCancel, initialsValues }: MeetingFormProps) => {

  const[agentSearch,setAgentSearch] = useState("")
  const [openAgentDialog,setOpenAgentDialog] = useState(false)
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const agents = useQuery(trpc.agents.getMany.queryOptions({
     pageSize:100,
     search:agentSearch,
  }))

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

          if(initialsValues?.id){
             queryClient.invalidateQueries(
              trpc.meetings.getOne.queryOptions({id:initialsValues.id})
             )
          }

          onSuccess?.(data[0]?.id)
      },
      onError: (error) => {
         toast.error(error.message)
      },

    
    })
  );
   const UpdateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

          if(initialsValues?.id){
             queryClient.invalidateQueries(
              trpc.meetings.getOne.queryOptions({id:initialsValues.id})
             )
          }

          onSuccess?.(data[0]?.id)
      },
      onError: (error) => {
         toast.error(error.message)
      },

    
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialsValues?.name ?? "",
      agentId: initialsValues?.agentId ?? "",
    }
  });

  const isEdit = !!initialsValues?.id;
  const isPending = createMeeting.isPending || UpdateMeeting.isPending;

  const submit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
        UpdateMeeting.mutate({...values, id: initialsValues.id})
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
    <NewAgaentDialouge open={openAgentDialog} onOpenChange={setOpenAgentDialog}></NewAgaentDialouge>
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(submit)}>
        
             <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
              <Input {...field} placeholder='e.g. Math Consultation'></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <FormControl>
                <CommandSelect options={(agents.data?.items ?? []).map((agent)=>{
                 
                 return({
                     id: agent.id,
                     value: agent.id,
                     children:(
                         <div className=' flex items-center gap-x-2'>
                            <GeneratedAvatar seed= {agent.name} variant='botttsNeutral' className='border size-6'>
                               
                            </GeneratedAvatar>
                            <span>{agent.name}</span>
                         </div>
                     )
                 })
                  
                })}
                 onSelect={field.onChange}
                 onSearch={setAgentSearch}
                 value = {field.value}
                 placeholder='select an agent'
                ></CommandSelect>
              </FormControl>
              <FormDescription>
                Not Found what You are Looking for?{""}
                <button type='button' className='text-primary hover:underline' onClick={()=>{ setOpenAgentDialog(true)}}>
                    Create new Agent
                </button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isEdit ? "Update Meetings" : "Create Meetingt"}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
    </>
  );
};

export default MeetingForm;
