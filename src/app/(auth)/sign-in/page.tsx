
 import React from 'react'
 import { auth } from '@/lib/auth'
 import SignInview from '@/modules/ui/views/SignInview'
 import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
 
 const page = async() => {
  const session = await auth.api.getSession({
       headers: await headers(),
    });
  
    if(!!session){
       return(
          redirect("/")
       )
    }
   return (
      <SignInview></SignInview>
   )
 }
 
 export default page