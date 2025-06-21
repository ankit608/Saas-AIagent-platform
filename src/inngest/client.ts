// import { getInngestKey } from "@/lib/utils";
import {Inngest} from "inngest"

export const inngest = new Inngest({
  id: "meet-ai2",
  eventKey: process.env.NEXT_INNGEST_EVENT_KEY, // ✅ use `eventKey`, not `INNGEST_EVENT_KEY`
});
