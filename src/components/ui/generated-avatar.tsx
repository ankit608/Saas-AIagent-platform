import {createAvatar} from "@dicebear/core"
import {initials,botttsNeutral} from "@dicebear/collection"
import {cn} from "@/lib/utils"

import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar"


interface GeneratedAvatarProps{
     seed: string
     className?: string;
      variant: "botttsNeutral"| "initials";

}

export const GeneratedAvatar=({
     seed,
     className,
     variant
}:GeneratedAvatarProps)=>{
     let avatar;
     if(variant==="botttsNeutral"){
         avatar = createAvatar(botttsNeutral,{
             seed,

         })
     }else{
         avatar = createAvatar(initials,{
             seed,
             fontWeight:500,
             fontSize:42
         })
     }


     return(
        <Avatar className={cn(className)}>
            <AvatarImage className=" rounded-full" src={avatar.toDataUri()} height={50} width={50} alt=" avatar"></AvatarImage>
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
     )
}