'use client'
import { PlusIcon } from 'lucide-react'
import  { useState } from 'react'
import { Button } from '@/components/ui/button'
import NewAgaentDialouge from './NewAgaentDialouge'

const AgentHeader = () => {
     
    const [isDialogOpen,setisDialouge] =  useState(false)
    return (
    <>
    <NewAgaentDialouge open={isDialogOpen} onOpenChange={setisDialouge} ></NewAgaentDialouge>
    <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className=' flex items-center justify-between'>
            <h5 className='font-medium'>My Agents</h5>
            <Button onClick={()=>{setisDialouge(!isDialogOpen)}}>
              <PlusIcon></PlusIcon>
              New Agent
            </Button>
        </div>
    </div>
    </>
  )
}

export default AgentHeader