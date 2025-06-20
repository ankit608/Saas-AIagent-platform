
 import React from 'react'
 import { auth } from '@/lib/auth'
 import SignInview from '@/modules/ui/views/SignInview'
 import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
 
 const page = async() => {

   return (
      <SignInview></SignInview>
   )
 }
 
 export default page