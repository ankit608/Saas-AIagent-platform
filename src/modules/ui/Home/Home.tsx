
"use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { user } from "../../../../auth-schema";
import { useTRPC } from "@/app/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {


 return(
  <div>
    Home page
  </div>
  )
}
