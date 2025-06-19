import React from 'react'
import { MeetingGetOne } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { BookOpenTextIcon, FileTextIcon, FileVideoIcon, ClockFadingIcon, Sparkles, SparklesIcon} from 'lucide-react';
import Markdown from "react-Markdown"
import Generateavatar from '@/lib/avatar';
import Link from 'next/link';
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import {format} from "date-fns"
import { Badge } from '@/components/ui/badge';

interface Props{
     data: MeetingGetOne;
}

const CompletedState = ({data}:Props) => {
  return (
    <div className='flex flex-col gap-y-4 '>
       <Tabs defaultValue='summary'>
        <div className='bg-white rounded-lg border px-3'>
            <ScrollArea>
                <TabsList className=' p-0 bg-background justify-start rounded-none h-13'>
                      <TabsTrigger value="summary" className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none  border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                        <BookOpenTextIcon></BookOpenTextIcon>
                        summary
                      </TabsTrigger>
                          <TabsTrigger value="Transcript" className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2  border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                           <FileTextIcon></FileTextIcon>
                        Transcript
                      </TabsTrigger>
                      <TabsTrigger value="recording" className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2  border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                               <FileVideoIcon></FileVideoIcon>
                               Recording
                      </TabsTrigger>
                      <TabsTrigger value="Transcript" className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2  border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                             <SparklesIcon></SparklesIcon>
                               Ask AI
                      </TabsTrigger>
                </TabsList>
                 <ScrollBar orientation='horizontal'></ScrollBar> 
            </ScrollArea>


        </div>
        <TabsContent value='recording'>
            <div className=' bg-white rounded-lg border px-4 py-5'>
                <video src={data.recordingUrl!} className='w-full rounded-lg ' controls></video>
            </div>
        </TabsContent>
        <TabsContent value='summary'>
            <div className='bg-white rounded-lg border'>
                <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
                    <h2 className='text-2xl font-medium capitalize'>{data.name}</h2>
                    <div className='flex gap-x-2 items-center'>
                        <Link href={`/agents/${data.agent.id}`} className="flex items-center gap-x-2 underline underline-offset-4 capitalize">
                        <GeneratedAvatar variant='botttsNeutral' seed={data.agent.name} className='size-5'></GeneratedAvatar>
                         {data.agent.name}
                        </Link>
                        {" "}
                        <p>{data.startedAt ? format(data.startedAt,"PPP"):"PPP"}</p>
                    </div>
                    <div className='flex gap-x-2 items-center'>
                        <SparklesIcon className='size-4'>
                          
                        </SparklesIcon>
                          <p>General Summary</p>
                    </div>
                    <Badge variant="outline" className='flex items-center gap-x-2 [&>svg]:size-4'>
                        <ClockFadingIcon className=' text-blue-700'></ClockFadingIcon>
                    </Badge>
                    <div>
                        <Markdown components={{
                             h1:(props)=>(
                                <h1 className='text-2xl font-medium mb-6'{...props}></h1>
                             ),
                              h2:(props)=>(
                                <h1 className='text-xl font-medium mb-6'{...props}></h1>
                             ),
                              h3:(props)=>(
                                <h1 className='text-lg font-medium mb-6'{...props}></h1>
                             ),
                              h4:(props)=>(
                                <h1 className='text-base font-medium mb-6'{...props}></h1>
                             ),
                              p:(props)=>(
                                <p className='text-base font-medium mb-6'{...props}></p>
                             ),
                             ol: (props)=>(
                                <ol className=''></ol>
                             ),
                             li: (props) => <li className='mb-1' {...props}></li>,
                             strong: (props)=>(
                                 <strong className='font-semibold' {...props}></strong>
                             ),

                             code: (props) =>(
                                <code className='bg-gray-100 px-1 py-0.5 rounded' {...props}></code>
                             )
                             
                        }}>
                            {data.summary}
                        </Markdown>
                    </div>
                </div>

            </div>
        </TabsContent>
       </Tabs>
    </div>
  )
}

export default CompletedState
