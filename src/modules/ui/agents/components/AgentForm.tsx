import React from 'react';
import { z } from 'zod';
import { AgentGetOne } from "../types";
import { useTRPC } from '@/app/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agentInsertSchema } from '../schema';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialsValues?: AgentGetOne;
}

const AgentForm = ({ onSuccess, onCancel, initialsValues }: AgentFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

          if(initialsValues?.id){
             queryClient.invalidateQueries(
              trpc.agents.getOne.queryOptions({id:initialsValues.id})
             )
          }

          onSuccess?.()
      },
      onError: (error) => {
         toast.error(error.message)
      },

    
    })
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialsValues?.name ?? "",
      instructions: initialsValues?.instructions ?? "",
    }
  });

  const isEdit = !!initialsValues?.id;
  const isPending = createAgent.isPending;

  const submit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      console.log("TODO: updateAgent", values);
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(submit)}>
        <GeneratedAvatar seed={form.watch("name")} variant='botttsNeutral' className='border size-4' />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter agent name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter instructions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isEdit ? "Update Agent" : "Create Agent"}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;
