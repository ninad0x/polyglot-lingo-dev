'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { ReplyModal } from './reply-modal'
import { Ticket } from '@/lib/types'

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsOpen(true)}>

        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">{ticket.customer_email}</CardTitle>
            <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
              {ticket.status}
            </Badge>
          </div>
          <CardDescription>
            {ticket.detected_language} • {new Date(ticket.created_at).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-1">{ticket.customer_message_translated}</p>
        </CardContent>
      </Card>

      <ReplyModal 
        ticket={ticket}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>

    
  )
}