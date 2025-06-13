
import React from 'react'
import { Button } from '@/components/ui/button';
interface Props{
     page:number;
     totalPages:number;
     onPageChange: (page:number)=>void
}
const DataPagination = ({page,totalPages,onPageChange}:Props) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex text-sm text-muted-foreground'>
         Page {page} of {totalPages || 1}
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button disabled = {page==1} variant="outline" size="sm" onClick={()=>onPageChange(Math.max(1,page-1))}>
            Previous
        </Button>
        <Button disabled ={page === totalPages || totalPages===1} variant="outline" onClick={()=>onPageChange(Math.min(page+1))}>
            Next
        </Button>
      </div>
    </div>
  )
}

export default DataPagination
