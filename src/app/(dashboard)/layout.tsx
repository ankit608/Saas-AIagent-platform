'use client'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import DashboardSidebar from '@/modules/ui/dashboard/components/dashboard-sidebar'
import DashBoardNavbar from '@/modules/ui/dashboard/components/DashBoardNavbar'

interface Props {
     children: React.ReactNode
}

const layout = ({children}:Props) => {
  return (
     <SidebarProvider>
      <DashboardSidebar></DashboardSidebar>
      <main className=' flex flex-col h-screen  w-screen bg-muted '>
        <DashBoardNavbar></DashBoardNavbar>
         {children}
      </main>
   
     </SidebarProvider>
  )
}

export default layout