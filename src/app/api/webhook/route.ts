import {and,ConsoleLogWriter,eq,not} from "drizzle-orm"
import{
  CallEndedEvent, CallRecordingReadyEvent, CallSessionStartedEvent, CallSessionParticipantLeftEvent, CallTranscriptionReadyEvent
} from "@stream-io/node-sdk"

import {db} from "@/db"
import { agents,meetings} from "@/db/schema"
import {streamvideo} from "@/lib/stream-video"
import { NextRequest, NextResponse } from "next/server"
import { error } from "console"
 import { inngest } from "@/inngest/client"
 import { getInngestKey } from "@/lib/utils"
 import { getOpenAiApiKey } from "@/lib/utils"




function verifySignatureWithSDK(body:string,signature:string):boolean {
     return streamvideo.verifyWebhook(body,signature)
}


export async function POST(req:NextRequest){
     const signature = req.headers.get("x-signature")
     const  apiKey = req.headers.get("x-api-key")

    

     if(!signature || !apiKey){
         return NextResponse.json(
            {error:"Missing signature or API key"},
            {status:400}
         )
     }

     const body  = await req.text()
     if(!verifySignatureWithSDK(body,signature)){
          return NextResponse.json({error:"Invalid signature"},{status:401})
     }
      
   

     let payload:unknown

     try{
         payload = JSON.parse(body) as Record<string,unknown>
         
     }catch{
         return NextResponse.json({error:"Invalid JSON"},{status:400})
     }

     const eventType = (payload as Record<string,unknown>)?.type;

     console.log(eventType,"EventType.....")
      
     if(eventType === "call.session_started"){
          
        const event = payload as CallSessionStartedEvent;
         console.log(event.call.custom,"lfjl")
        const meetingId = event.call.custom?.meetingId

        if(!meetingId){
             return NextResponse.json({error:"Missing meetingId"},{status:400})
        }

        console.log(meetingId,"meetingid")
        const [existingMeeting] = await db.select().from(meetings).where(
             and(eq(meetings.id, meetingId),
                not(eq(meetings.status,"completed")),
                not(eq(meetings.status,"active")),
                  not(eq(meetings.status,"cancelled")),
                    not(eq(meetings.status,"processing"))
                    // "upcoming","active","completed","processing","cancelled"
            )
        )

        if(!existingMeeting){
            console.log("not found")
             return NextResponse.json({error:"Meeting not found"},{status:400})
        }

        await db.update(meetings).set({
             status:"active",
             startedAt: new Date()
        }).where(eq(meetings.id, existingMeeting.id))

        
     const [existingAgent] = await db.select().from(agents).where(eq(agents.id, existingMeeting.agentId))
     console.log(existingAgent,"existing Agent...")

     if(!existingAgent){
         return NextResponse.json({error:"Agent Not found"}, {status:404})
     }

     const call = streamvideo.video.call("default",meetingId);
         console.log(existingAgent,"existingAgenttttt")
     const realtimeClient = await streamvideo.video.connectOpenAi({
           call,
           openAiApiKey: getOpenAiApiKey(),
           agentUserId: existingAgent.id

     });

       realtimeClient.updateSession({
         instruction: existingAgent.instructions
       })

     }else if(eventType === "call.session_participant_left"){
         const event = payload as CallSessionParticipantLeftEvent;
         const meetingId = event.call_cid.split(":")[1];

         if(!meetingId){
            return NextResponse.json({error:" missing meetingId"},{status:400})

         }

         const call = streamvideo.video.call("default",meetingId)
         await call.end()
     }else if(eventType==="call.ended"){
       const event  = payload as CallEndedEvent;
       console.log(event.call.custom,"customevent")

       const meetingId = event.call.custom?.meetingId;


       if(!meetingId){
         return NextResponse.json({error:"Missing MeetingId"},{status:400})
       }
       await db.update(meetings).set({
         status: "processing",
         endendAt: new Date()
       }).where( and(eq(meetings.id,meetingId),eq(meetings.status,"active")));
     }else if(eventType==="call.transcription_ready"){
       const event = payload as CallTranscriptionReadyEvent
       const meetingId  = event.call_cid.split(":")[1]

       const updateMeeting = await db.update(meetings).set({
          transcriptUrl: event.call_transcription.url,
           
         


         }).where(eq(meetings.id,meetingId)).returning()

          if(!updateMeeting){
              return NextResponse.json({error:"Meeting not found"},{status:404})
          }
            
          console.log(updateMeeting,"updateMeeting......")

      
          await inngest.send({name: "meetings/processing",
             data: {
               meetingId: updateMeeting[0].id,
               transcriptUrl: updateMeeting[0].transcriptUrl
             }
          })
     }else if(eventType === "call.recording_ready"){
      const event = payload as CallRecordingReadyEvent;
       const meetingId = event.call_cid.split(":")[1]

       await db.update(meetings).set({
           recordingUrl: event.call_recording.url,

       }).where(eq(meetings.id,meetingId))

        
    
    }


     
     
     return NextResponse.json({status:"ok"})
}

