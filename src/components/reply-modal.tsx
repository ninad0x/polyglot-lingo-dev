'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { sendReply } from '@/actions/send-reply-action'
import { Ticket } from '@/lib/types'

type ReplyModalProps = {
  ticket: Ticket
  isOpen: boolean
  onClose: () => void
}

export function ReplyModal({ ticket, isOpen, onClose }: ReplyModalProps) {
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    setLoading(true)
    await sendReply({ ticketId: ticket.id, reply, targetLanguage: ticket.detected_language })
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply to {ticket.customer_email}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Customer message (English):</p>
            <p className="text-sm border p-3 rounded bg-gray-50">
              {ticket.customer_message_translated}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Your reply:</p>
            {ticket.agent_reply_original !== null

              ? (<div>
                  <p className="text-sm border p-3 rounded bg-gray-50">
                    {ticket.agent_reply_original}
                  </p>
                </div>)
              
              : (<Textarea 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply in English..."
                  rows={5}
            />)
            }
          </div>

          {ticket.status === "open" && (
            <Button onClick={handleSend} disabled={loading} className="w-full">
              {loading ? 'Sending...' : 'Send Reply'}
          </Button>)
          }
          

        </div>
      </DialogContent>
    </Dialog>
  )
}