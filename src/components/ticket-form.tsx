"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ticketSchema } from "@/lib/types"
import { submitTicket } from "@/app/submit/submit-action"
import { useState } from "react"


export default function TicketForm() {

  const [translation, setTranslation] = useState({
    detectedLanguage: "",
    translatedMessage: ""
  })

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { email: "", message: "" },
  })

  async function handleSubmit(values: z.infer<typeof ticketSchema>) {
    const response = await submitTicket(values)
    if (response.success) {
      setTranslation({ 
        detectedLanguage: response.detectedLanguage!,
        translatedMessage: response.translatedMessage!
      })
    }
  }

  return (
    <div className="w-full p-4 shadow-[0_8px_50px_rgb(0,0,0,0.12)] rounded-xl">

    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your issue…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="">
          Submit Ticket
        </Button>

        <div className="flex flex-col p-5">
          <span>
            Language: {translation.detectedLanguage}
          </span>
          <span>
            Message: {translation.translatedMessage}
          </span>
        </div>
      </form>
    </Form>
    </div>

  )
}
