'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { DropdownMenuTrigger,DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import { ChevronDownIcon, CreditCard, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerFooter, DrawerClose, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';




const DashboardUserButton = () => {
   const router = useRouter();
  const {data,isPending} = authClient.useSession();

  const isMobile = useIsMobile()
  

   const onLogOut = () =>{
       authClient.signOut({
         fetchOptions:{
           onSuccess:()=>{
               router.push("/sign-in")
           }
         }
       })
   }
   
    if(isPending || !data?.user){
    console.log(data,"data")
     return null;
  }
   if(isMobile){
    return(
        <Drawer>
      <DrawerTrigger asChild className=' rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
           <div>
              {data?.user.image?<Avatar><AvatarImage src={data?.user.image}></AvatarImage></Avatar>:<GeneratedAvatar seed={data?.user.name ||"A"} variant='initials' className='size-9 mr-3 rounded-lg' ></GeneratedAvatar>}
        
           <div className=' flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'> 
          <p className=' text-sm truncate w-full'>
            {data?.user.name}
          </p>
           <p className=' text-sm truncate w-full'>
            {data?.user.email}
          </p>
            <ChevronDownIcon className=' size-4 shrink-0
          '></ChevronDownIcon>
         </div>
           </div>
          
        
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.user.name}</DrawerTitle>
             <DrawerDescription>
               {data.user.email}
             </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="outline" onClick={()=>{}}>
               Billing
            <CreditCardIcon className=' size-4 text-black'></CreditCardIcon>
         
          </Button>
           <Button variant="outline" onClick={()=>{onLogOut()}}>
              Logout
              <LogOutIcon></LogOutIcon>
              
          </Button>
          
        </DrawerFooter>
      </DrawerContent>
     </Drawer>
    )
   
   }
  
 

  return (
      <DropdownMenu>
        <DropdownMenuTrigger className=' rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>

          {data.user.image?<Avatar><AvatarImage src={data.user.image}></AvatarImage></Avatar>:<GeneratedAvatar seed={data.user.name} variant='initials' className='size-9 mr-3 rounded-lg' ></GeneratedAvatar>}
        
           <div className=' flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'> 
          <p className=' text-sm truncate w-full'>
            {data.user.name}
          </p>
           <p className=' text-sm truncate w-full'>
            {data.user.email}
          </p>
         </div>
          <ChevronDownIcon className=' size-4 shrink-0
          '></ChevronDownIcon>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side='right' className='w-72'>
          <DropdownMenuLabel>
             <div className=' flex flex-col gap-1'>
              <span className='font-medium truncate'>{data.user.name}</span>
              <span className='text-sm font-normal text-muted-foreground truncate'>
                {data.user.email}
              </span>
              </div>           
          </DropdownMenuLabel>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem  className=' cursor-pointer flex items-center justify-between font-semibold'>
             Billing
             <CreditCardIcon className=' size-4'></CreditCardIcon>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer flex items-center justify-between font-semibold' onClick={()=>{
             onLogOut()
          }}>
             Logout
              <LogOutIcon className=' size-4'></LogOutIcon>
          </DropdownMenuItem>
        </DropdownMenuContent>
        
      </DropdownMenu>
  )
}

export default DashboardUserButton