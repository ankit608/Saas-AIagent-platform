"use client"
import { Sidebar,SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-context-menu'
import { SidebarSeparator } from '@/components/ui/sidebar'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import DashboardUserButton from './DashboardUserButton'


const firstSection = [
    {
        icon: BotIcon,
        label:"Agents",
        href:"/agents"
    },
     {
        icon: StarIcon,
        label:"Meetings",
        href:"/meetings"
    },
     {
        icon: VideoIcon,
        label:"Videos",
        href:"/videos"
    }
]


const SecondSection = [
  
     {
        icon: StarIcon,
        label:"Updates",
        href:"/updates"
    },
    
]
const DashboardSidebar = () => {
    const pathname = usePathname()
    return (
     <Sidebar>
        <SidebarHeader className=' text-sidebar-accent-foreground'>
             <Link href="/" className=' flex items-center gap-2 px-2 pt-2'>
              <Image src="logosvg.svg" height={36} width={36} alt='Logo'>
              
              </Image>
              <p className=' text-2xl font-semibold'>Meet.AI</p>
             </Link>
        </SidebarHeader>
        <div className=' px-4 py-2'>
           <SidebarSeparator className=' opacity-100 text-[#5D6B68]'></SidebarSeparator>
        </div>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {firstSection.map((items)=>{
                             return(
                                <SidebarMenuItem key={items.href}>
                                  <SidebarMenuButton asChild className={cn("h-10  border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent via-sidebar/50 to-sidebar/50",
                                    pathname===items.href && "bg-linear-to-r/oklch border-[5D6868]/10"
                                )}  isActive={pathname===items.href}>
                                    
                                    <Link href={items.href} className='flex gap-4'>
                                    <items.icon className='size-5'></items.icon>
                                     <span>{items.label}</span>
                                     
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                             )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {SecondSection.map((items)=>{
                             return(
                                <SidebarMenuItem className={cn("h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                    pathname===items.href && "bg-linear-to-r/oklch border-[5D6868]/10"
                                )} key={items.href}>
                                  <SidebarMenuButton asChild className=' font-semibold' isActive={pathname===items.href}>
                                    
                                    <Link href={items.href} className='flex gap-4'>
                                    <items.icon className='size-5'></items.icon>
                                     <span>{items.label}</span>
                                     
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                             )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
           
        </SidebarContent>
         <SidebarFooter className='text-white'>
                <DashboardUserButton></DashboardUserButton>
            </SidebarFooter>
     </Sidebar>
  )
}

export default DashboardSidebar