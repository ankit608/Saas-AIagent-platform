import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    VideoIcon,
    LoaderIcon,
} from "lucide-react"

import CommandSelect from "@/components/CommandSelect"
import { MeetingStatus } from "../types"
import UseMeeting from "./hooks/UseMeeting"
import { Children } from "react"

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];


export const StatusFilter =()=>{
     const [filters,setFilter] = UseMeeting();

     return(
        <CommandSelect placeholder="Status" classname="h-9" options={options} onSelect={(value)=>{
             setFilter({ status: value as MeetingStatus });
             

        }}
         value={filters.status ?? ""}
        ></ CommandSelect>
     )
}