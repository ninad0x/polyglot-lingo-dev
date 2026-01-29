import z from "zod";

export const ticketSchema = z.object({
  email: z.string().email(),
  message: z.string(),
})