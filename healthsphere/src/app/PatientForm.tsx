'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Mail } from "lucide-react" // Import icon from lucide-react
import SubmitButton from '@/components/SubmitButton'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { log } from 'console'

const formSchema = z.object({
 username: z.string().min(2, {
   message: "The username must contain at least 2 characters"
 }).max(50),
 email: z.string().email(),
 phoneNumber: z.string().min(5, {
   message: "Phone number should have at least 5 characters"
 })
})




const PatientForm = () => {
  const Router = useRouter()
  const [isLoading, setIsLoading]= useState(false)

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
    email: "",
    phoneNumber: ""
  },
 })
 async function handleSubmit({username,email,phoneNumber}: z.infer<typeof formSchema>){
  setIsLoading(true);
  try {
    // const userData = {username,email,phoneNumber}
    // const user = await createUser(userData);
    // if (user) {
    //   Router.push(`/patients/${user.id}/register`);
    // }
  } catch (error) {
    console.log(error);
    
  }
 
};
 return (
   <Form {...form}>
     <form onSubmit={form.handleSubmit(handleSubmit)} className=''>
       <FormField
         control={form.control}
         name="username"
         render={({ field }) => {
           return (
             <FormItem>
               <FormLabel>Username</FormLabel>
               <FormControl>
                 <Input
                   placeholder="User name"
                   type="text"
                   {...field}
                 />
               </FormControl>
               <FormMessage />
             </FormItem>
           );
         }}
       />
       <FormField
         control={form.control}
         name="email"
         render={({ field }) => {
           return (
             <FormItem>
               <FormLabel>Email</FormLabel>
               <FormControl>
                 <div className="relative">
                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                     <Mail className="h-5 w-5 text-gray-400" />
                   </span>
                   <Input
                     placeholder="Email"
                     type="email"
                     className="pl-10"
                     {...field}
                   />
                 </div>
               </FormControl>
               <FormMessage />
             </FormItem>
           );
         }}
       />
       <FormField
         control={form.control}
         name="phoneNumber"
         render={({ field }) => {
           return (
             <FormItem>
               <FormLabel>Phone Number</FormLabel>
               <FormControl>
                 <PhoneInput
                   country={'us'}
                   value={field.value}
                   onChange={field.onChange}
                   inputProps={{
                     name: 'phoneNumber',
                     required: true,
                     autoFocus: false,
                   }}
                   inputClass="w-full pl-12 border rounded-md focus:outline-none"
                   containerClass=""
                 />
               </FormControl>
               <FormMessage />
             </FormItem>
           );
         }}
       />
       <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
     </form>
   </Form>
 )
}

export default PatientForm
