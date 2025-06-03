import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import DashboardSidebar from '@/modules/ui/dashboard/components/dashboard-sidebar'


interface Props {
     children: React.ReactNode
}

const layout = ({children}:Props) => {
  return (
     <SidebarProvider>
      <DashboardSidebar></DashboardSidebar>
      <main className=' flex flex-col h-screen  w-screen bg-muted '>
         {children}
      </main>
   
     </SidebarProvider>
  )
}

export default layout