
import {JSX,useState} from "react"
import { Button } from "@/components/ui/button"
import { CommandDialogResponsive } from "@/components/ui/command"
import { resolve } from "path"
import ResponSiveDialog from "@/components/ui/ResponsiveDialog"


export const useConfirm = (
     title: string,
     description: string
):[()=>JSX.Element, () => Promise<unknown>]=>{
     const [promise,setPromise] = useState<{
        resolve:(value:boolean)=> void;
     }| null>(null)

     const confirm = () =>{
         return  new Promise((resolve)=>{
             setPromise({resolve})
         })
     }

      const handleConfirm = () =>{
         promise?.resolve(true);
          handeleClose()
      }

     const handeleClose = () =>{
         setPromise(null);
     }

     const handleCancel = () =>{
         promise?.resolve(false)
         handeleClose();
     }


     const ConfirmationDialog = () =>
        (
             <ResponSiveDialog open={promise !== null} onOpenChange={handeleClose} title={title} description={description}>
           <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
             <Button onClick={handleCancel} variant="outline" className="w-full lg:w-auto">
                Cancel
             </Button>
              <Button onClick={handleConfirm} variant="outline" className="w-full lg:w-auto">
                Confirm
             </Button>
           </div>
        </ResponSiveDialog>
        )
       

     

 return [ConfirmationDialog,confirm]

}