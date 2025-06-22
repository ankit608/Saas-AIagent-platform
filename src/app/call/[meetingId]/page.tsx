// 

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { trpc } from "@/app/trpc/server";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CallView from "@/modules/call/ui/views/CallView";

export default async function Page({ params }: { params: { meetingId: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { meetingId } = params;
  console.log(meetingId, "meetingId");

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  console.log("entering to hydration");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallView meetingId={meetingId} />
    </HydrationBoundary>
  );
}
