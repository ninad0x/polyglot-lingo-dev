import z from "zod";

export const ticketSchema = z.object({
  email: z.string().email(),
  message: z.string(),
})

export type Ticket = {
  id: string
  customer_email: string
  customer_message_original: string
  customer_message_translated: string
  detected_language: string
  sentiment: string | null
  agent_reply_original: string | null
  agent_reply_translated: string | null
  status: string
  created_at: Date
}