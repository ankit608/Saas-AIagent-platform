import React, { Dispatch,SetStateAction } from 'react'

import { Command, CommandDialog, CommandInput } from '@/components/ui/command'
import { CommandItem, CommandList } from 'cmdk';




interface Props{
     open: boolean;
     setOpen:Dispatch<SetStateAction<boolean>>;

}

const DashboardCommand = ({open,setOpen}:Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Find a meeting or agent'></CommandInput>
        <CommandList>
            <CommandItem >
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}

export default DashboardCommand