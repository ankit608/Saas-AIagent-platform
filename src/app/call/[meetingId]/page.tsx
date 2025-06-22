// In Page.tsx
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { trpc } from "@/app/trpc/server";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import CallView from "@/modules/call/ui/views/CallView";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { meetingId } = await params;
  console.log(meetingId, "meetingId");

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchQuery(
      trpc.meetings.getOne.queryOptions({ id: meetingId })
    );
  } catch (error) {
    console.error("Prefetch query failed:", error);
  }

  console.log("entering to hydration");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading CallView...</div>}>
        <CallView meetingId={meetingId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;