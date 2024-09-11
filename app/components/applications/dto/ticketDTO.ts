import { Ticket } from '~/components/domains/ticket/Ticket'

export type TicketDTO = {
	id: string
	name: string
	start: string
	end: string
}

export type EventsLogDTO = {
	id: string
	eventType: string
	username: string
	eventTime: Date
	details?: string
}

export const fromTicketToTicketDTO = (ticket: Ticket): TicketDTO => ({
	id: ticket.id,
	name: ticket.title,
	start: ticket.startedAt.toISOString(),
	end: ticket.completedAt.toISOString(),
})
