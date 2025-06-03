import { PanelLeftCloseIcon, PanelLeftIcon, PanelRight, PanelRightIcon, Search, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import DashboardCommand from './DashboardCommand'

const DashBoardNavbar = () => {

    const {state,toggleSidebar,isMobile} = useSidebar();
    const [commandOpen,setCommandOpen] = useState(false)

    useEffect(()=>{
      const down = (e: KeyboardEvent)=>{
          if(e.key==="k" && (e.metaKey|| e.ctrlKey)){
             e.preventDefault();
             setCommandOpen(!commandOpen)
          }
      }   
      document.addEventListener("keydown",down);
      return () => document.removeEventListener("keydown",down)
    })
  return (
    <>
    <DashboardCommand open={commandOpen} setOpen={setCommandOpen}></DashboardCommand>
      <nav className=' flex px-4  gap-x-2 items-center py- border-b  bg-background'>
        <Button className=' size-9' variant="outline" onClick={toggleSidebar}>
            {!(state==="collapsed")?<PanelLeftIcon className='size-4' ></PanelLeftIcon>:<PanelLeftCloseIcon className=' size-4'></PanelLeftCloseIcon>} 
        </Button>
        <Button className=' h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground' variant="outline" size="sm" onClick={()=>{
            setCommandOpen(!commandOpen)
        }}>
            <SearchIcon></SearchIcon>
            Search
            <kbd  className=' text-sm ml-auto pointer-events-none inline-flex h-5 select-none  items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                <span>&#8984;</span>
            </kbd>
        </Button>
      </nav>
      </>
  )
}

export default DashBoardNavbar