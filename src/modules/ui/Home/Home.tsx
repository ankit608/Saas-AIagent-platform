
"use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { user } from "../../../../auth-schema";
import { useTRPC } from "@/app/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const trpc = useTRPC()

    const {data} = useQuery(trpc.hello.queryOptions({text:"Ankit"}))

 return(
  <div>
   {data?.greeting}
  </div>
  )
}
