interface Props{
  children: React.ReactNode;
}

import React from 'react'

const layout = ({children}:Props) => {
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
        {children}
    </div>
  )
}

export default layout