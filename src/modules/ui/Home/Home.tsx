
"use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { user } from "../../../../auth-schema";

export default function Home() {
  const {data: session} = authClient.useSession();
   const router = useRouter()
    if(!session){
       return (
        <p>loading...</p>
       )
    }

 return(
  <div>
    <p>Logged in as {session?.user.name}</p>
    <Button onClick={()=>{ authClient.signOut({
        fetchOptions:{
             onSuccess:()=>{
                 router.push("/sign-in")
             }
        }
    })}} >
      Sign out
    </Button>
  </div>
  )
}
