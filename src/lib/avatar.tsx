import React from 'react'
import { createAvatar } from '@dicebear/core'
import {botttsNeutral,initials} from "@dicebear/collection"

interface Props{

    seed:string;
    variant: "botttsNeutral"| "initials"
}

const Generateavatar = ({seed, variant}:Props):string => {
    let avatar
    if(variant==="botttsNeutral"){
        avatar = createAvatar(botttsNeutral,{seed})
    }else{
         avatar = createAvatar(initials,{seed,fontWeight:500, fontSize:42})
    }


  return (
     avatar.toDataUri()
  )
}

export default Generateavatar
