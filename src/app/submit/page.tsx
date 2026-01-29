import TicketForm from '@/components/ticket-form'
import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'

export default async function Submit() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()
    if (error || !data?.claims) {
      redirect('/auth/login')
    }

  return (
    <div className='max-w-5xl mx-auto p-5'>
      <TicketForm />
    </div>
  )
}
