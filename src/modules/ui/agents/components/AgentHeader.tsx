'use client'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import  { useActionState, useState } from 'react'
import { Button } from '@/components/ui/button'
import NewAgaentDialouge from './NewAgaentDialouge'
import { useAgentsFilters } from '../hooks/use-agents-filters'
import AgentSearchFilters from './AgentSearchFilters'
import { DEFAULT_PAGE } from '@/constant'

const AgentHeader = () => {
     const [filters,setFilters] = useAgentsFilters()
    const [isDialogOpen,setisDialouge] =  useState(false)
    const isAnyFilterModified = !!filters.search;
     
    const onClearFilters = ()=>{
      setFilters({
         search:"",
         page: DEFAULT_PAGE
      })
    }
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
        <div className=' flex  items-center gap-2-x p-1'>
          <AgentSearchFilters></AgentSearchFilters>
          {isAnyFilterModified&&(
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon></XCircleIcon>
              Clear
            </Button>
          )}
        </div>
    </div>
    </>
  )
}

export default AgentHeader