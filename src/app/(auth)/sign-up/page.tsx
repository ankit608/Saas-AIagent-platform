import React from 'react'
import SignUpview from '@/modules/ui/views/SignUpview'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {
  
   
  return (
   
      <SignUpview></SignUpview>
   
  )
}

export default page