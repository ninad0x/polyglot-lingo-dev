"use server"

// import { createClient } from "@/lib/server"
import { lingo } from "@/lib/lingo-client"
import z from "zod"
import { ticketSchema } from "@/lib/types"

export async function submitTicket(values: z.infer<typeof ticketSchema>) {
  const email = values.email
  const message = values.message
  if (!email || !message) return { success: false }

  // Detect language
  const detectedLanguage = await lingo.recognizeLocale(message)

  // Then translate
  const res = await lingo.localizeText(message, {
    sourceLocale: detectedLanguage,
    targetLocale: "en"
  })

  // const supabase = await createClient()
  // await supabase.from("tickets").insert({
  //   customer_email: email,
  //   customer_message_original: message,
  //   customer_message_translated: text,
  //   detected_language: detectedLocale,
  //   status: "open",
  // })
  console.log(res);

  return { 
    success: true,
    detectedLanguage: detectedLanguage,
    translatedMessage: res
  }
}
