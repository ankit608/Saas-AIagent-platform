import { db } from "@/db";
import { eq, inArray } from "drizzle-orm";
import { agents, meetings, user } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import {createAgent,openai, TextMessage}  from "@inngest/agent-kit"

import JSONL from "jsonl-parse-stringify"
import { Users } from "lucide-react";
import { getOpenAiApiKey } from "@/lib/utils";


const summarizer = createAgent({
     name: "summarizer",
      system: `you are an expert summarizer, you write readable, conscise, simple content. you are given a transcript of a meeting and ayou need to summarize it.
         use the following markdown structure for wvery output:

         overview-:
         provied the detailed engagenig summary of the content. Focus on major features, user workflows,, and any key takeaways. write a naratice style.
          Notes
         Break down key content into thematic sections with timestamo ranges. Each section should summarize keyu points, or demos bullet format.

         Example:
         Section Name
         -Main point or demo shown here
         -Another key insight or iteraction
         - Follow-up tool or explanation provided

         Next Section
         - Feature X automatically doses Y]
         - Mention of itegration Z
      `.trim(),
      model: openai({model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY})
})
console.log( process.env.OPENAI_API_KEY,"APIKEY")
export const MeetingProcessing  = inngest.createFunction(
     {id: "meetings/processing"},
     {event: "meetings/processing"},

     async ({event,step})=>{
       
               try{ const response = await step.run("fetch_transcript",async()=>{
          const res = await fetch(event.data.transcriptUrl);
        
           if (!res.ok) {
              throw new Error(`Failed to fetch transcript: ${res.statusText}`);
                }
        const text = await res.text()
     
           return text
         });
       
         const  transcript = await step.run("parse-transcript", async ()=>{
               return JSONL.parse<StreamTranscriptItem>(response);
         })

               
         const transcriptWithSpeakers = await step.run("add-speakers",async()=>{
             const speakerIds = [
                 ...new Set(transcript.map((item)=>{
                     return item.speaker_id
                 }))
             ];


            console.log(speakerIds,"speakerssss....")
            const userspeaker = await db
  .select()
  .from(user)
  .where(inArray(user.id, speakerIds));

  console.log(userspeaker,"userspeakers")

const agentspeaker = await db
  .select()
  .from(agents)
  .where(inArray(agents.id, speakerIds));
    console.log(agentspeaker,"agentspeakers")


             const speakers = [...userspeaker, ...agentspeaker]

             return transcript.map((item)=>{
                 const speaker = speakers.find(
                    (speaker)=> speaker.id === item.speaker_id
                 )

                 if(!speaker){
                     return{
                         ...item,
                         user:{
                             name: "unknown"
                         }
                     }
                 }

                 return {
                     ...item,

                     user:{
                         name: speaker.name
                     }
                 }
             })
         })
             
      
        

         const {output} = await summarizer.run(
            "Summarize the following transcript"+
            JSON.stringify(transcriptWithSpeakers)
         );

    

         await step.run("save-summary",async ()=>{
             await db.update(meetings).set({
                 summary: (output[0] as TextMessage).content as string,
                 status: "completed"
             }).where(eq(meetings.id,event.data.meetingId))
         })}catch(error){
             console.log(error,"ingest_error")
         }
        
     }
)