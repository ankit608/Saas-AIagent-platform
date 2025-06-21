import { getInngestKey } from "@/lib/utils";
import {Inngest} from "inngest"

export const inngest = new Inngest({
  id: "meet-ai2",
  eventKey: getInngestKey() , // ✅ use `eventKey`, not `INNGEST_EVENT_KEY`
});
