import { getQueryClient,trpc } from '@/app/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import React, { Suspense } from 'react'
import AgentIdView from '../../../../modules/ui/agents/components/Agent-id.views'
import { AgentsIdViewLoading,
    AgentsIdViewError
 } from '../../../../modules/ui/agents/components/Agent-id.views'
interface Props {
     params: Promise<{agentId: string}>
}

const page = async ({params}: Props) => {
    const {agentId} = await params
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({id: agentId}))

  return (
     <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsIdViewLoading></AgentsIdViewLoading>}>
            <ErrorBoundary fallback={<AgentsIdViewError></AgentsIdViewError>}>
                <AgentIdView agentId={agentId}></AgentIdView>
            </ErrorBoundary>
        </Suspense>
     </HydrationBoundary>
  )
}

export default page
