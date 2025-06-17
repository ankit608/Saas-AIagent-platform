import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { trpc } from "@/app/trpc/server";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CallView from "@/modules/call/ui/views/CallView";

interface Props{
     params: Promise<{
        meetingId: string
     }>


}

 const Page = async({params}:Props)=>{
    const session = await auth.api.getSession({
         headers: await headers()
    })
    const {meetingId} = await params;

    if(!session){
         redirect("/sign-in");

    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
         trpc.meetings.getOne.queryOptions({id:meetingId})
    )
   
    return(
         <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <Suspense fallback={<p>Loading...</p>}>

                 <ErrorBoundary>

                 </ErrorBoundary>
            </Suspense> */}

            <CallView meetingId={meetingId}></CallView>
           
         </HydrationBoundary>
    )
}


export default Page