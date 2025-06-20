// import {serve} from "inngest/next";
// import { inngest } from "@/inngest/client";
// import { MeetingProcessing } from "@/inngest/function";

// export const {GET,POST,PUT} = serve({
//      client:inngest,
//       functions:[
//          MeetingProcessing   
//       ]
// })
// For Next.js App Router (v13+)
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js App Router API!' });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  return NextResponse.json({ message: `Hello, ${name}!` });
}
