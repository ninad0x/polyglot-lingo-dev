"use client"

import { Ticket } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketCard } from "./ticket-card";
import { motion } from "motion/react"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

const Grid = ({ tickets }: { tickets: Ticket[] }) => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    variants={container}
    initial="hidden"
    animate="show"
  >
    {tickets.map(ticket => (
      <motion.div key={ticket.id} variants={item}>
        <TicketCard ticket={ticket} />
      </motion.div>
    ))}
  </motion.div>
)

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  const openTickets = tickets.filter(t => t.status === "open")
  const closedTickets = tickets.filter(t => t.status === "closed")

  return (
    <div className="w-full">
      <Tabs defaultValue="all">
        <TabsList className="mb-5">
          <TabsTrigger value="all">All ({tickets.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({openTickets.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Grid tickets={tickets} />
        </TabsContent>

        <TabsContent value="open">
          <Grid tickets={openTickets} />
        </TabsContent>

        <TabsContent value="closed">
          <Grid tickets={closedTickets} />
        </TabsContent>
      </Tabs>
    </div>
  )
}