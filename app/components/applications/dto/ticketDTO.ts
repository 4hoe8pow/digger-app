import { Ticket } from '~/components/domains/ticket/Ticket'

export type TicketDTO = {
	id: string
	name: string
	start: string
	end: string
}

export const fromTicketToDTO = (ticket: Ticket): TicketDTO => ({
	id: ticket.id,
	name: ticket.title,
	start: ticket.startedAt.toISOString(),
	end: ticket.completedAt.toISOString(),
})
