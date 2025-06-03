import React from 'react'
import Home from '@/modules/ui/Home/Home'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await auth.api.getSession({
     headers: await headers(),
  });

  if(!session){
     return(
        redirect("/sign-in")
     )
  }
  return (
     <Home></Home>
  )
}

export default page