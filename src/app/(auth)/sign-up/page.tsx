import React from 'react'
import SignUpview from '@/modules/ui/views/SignUpview'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth.api.getSession({
          headers: await headers(),
       });
     
       if(!!session){
          return(
             redirect("/")
          )
       }
  return (
   
      <SignUpview></SignUpview>
   
  )
}

export default page