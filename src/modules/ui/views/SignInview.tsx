"use client"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { OctagonAlertIcon } from "lucide-react"
import Link from "next/link"
import {useForm}from "react-hook-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {FaGoogle,FaGithub} from "react-icons/fa"

const formSchema = z.object({
email: z.string().email(),
password: z.string().min(1,{message:"password is required"})
})
const SignInview = () => {

    const router = useRouter();
    const [error,setError] = useState<string | null>()
    const [pending,setPending] = useState(false)
    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
             email:"",
             password:""
        }
    });
    const onSubmit = async(data: z.infer<typeof formSchema>)=>{
        setPending(true)
        setError(null)
        const {error} = await authClient.signIn.email({
             email: data.email,
             password: data.password,
             callbackURL:"/"
        },{
             onSuccess: ()=>{
                setPending(false)
               
             },

             onError:(error)=>{
                  setPending(false)
                 setError(error.error.message)
             }
        })
    }
  return (
    <div className=' flex flex-col flex-6 px-20'>
          <Card className=' overflow-hidden p-0'>
      <CardContent className=' grid p-0 md:grid-cols-2'>
        <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
             <div className=" flex flex-col gap-6">
                <div className=" flex flex-col items-center text-center">
                    <h1 className=" text-2xl font-bold ">
                         Welcome Back
                    </h1>
                    <p className=" text-muted-foreground text-balance">
                     Login to your account
                    </p>
                </div>
                 <div className=" grid gap-3">
                <FormField control={form.control} name="email" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
                
  )}/>
             </div>
                 <div className=" grid gap-3 ">
                <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormControl>
                        <Input type="Password" placeholder="m@example.com" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
                
  )}/>
             </div>

             {!!error&& (
                <Alert className=" bg-destructive/10 border-none ">
                    <OctagonAlertIcon className=" h-4 w-4 !text-destructive"></OctagonAlertIcon>
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
             )}

             <Button disabled={pending} type="submit" className=" w-full">
                Sign-In
           
             </Button>
             <div className=" after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0  after:flex after:items-center after:border-t ">
             <span className=" bg-card text-muted-foreground relative z-10 px-2">
                or continue with 
             </span>
             </div>
             <div className=" grid grid-cols-2 gap-4">
                <Button disabled ={pending} variant="outline" typeof="buton" className="w-full"  onClick={()=>{
                      setPending(true)
                     authClient.signIn.social({
                         provider:"google",
                         callbackURL:"/"
                     }).then(()=>{
                          setPending(false)
                     })
                 }}>
                  
                    Google
                      <FaGoogle></FaGoogle>
                </Button>
                 <Button disabled={pending} variant="outline" typeof="buton" className="w-full" onClick={()=>{
                     setPending(true)
                     authClient.signIn.social({
                        callbackURL:"/",
                         provider:"github"
                     }).then(()=>{
                          setPending(false)
                     })
                 }}>
                    Github
                         <FaGithub></FaGithub>
                </Button>
             </div>
             <div  className=" text-center text-sm">
                Don't have an account ? {" "}<Link href ="/sign-up" className=" underline underline-offset-4">
                Sign-up</Link>
             </div>
             </div>
             
             
            </form>
        </Form>
            
            <div className=' bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4  items-center justify-center'>
                <img src="logosvg.svg"alt='Image' className='h-[92px] w-[92px]'></img>
                <p className=' text-2xl font-semibold text-white'>
                    Meet.AI
                </p>
            </div>
      </CardContent>
    </Card>

    <div className=" text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}and<a>{" "}Privacy Policy</a>
    </div>
    </div>
  
    
  )
}

export default SignInview