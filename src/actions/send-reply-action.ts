'use server'

import { lingo } from '@/lib/lingo-client'
import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function sendReply({
  ticketId,
  reply,
  targetLanguage
}: {
  ticketId: string
  reply: string
  targetLanguage: string
}) {

  // Translate reply English to user language
  const translatedReply = await lingo.localizeText(reply, {
    sourceLocale: 'en',
    targetLocale: targetLanguage
  })

  // Update ticket in Supabase
  const supabase = await createClient()
  const { error } = await supabase
    .from('tickets')
    .update({
      agent_reply_original: reply,
      agent_reply_translated: translatedReply,
      status: 'closed'
    })
    .eq('id', ticketId)

  if (error) {
    return { success: false, error: error.message }
  }

  // Refresh the dashboard page
  revalidatePath('/dashboard')

  return { success: true }
}