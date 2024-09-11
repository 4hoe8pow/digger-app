import { Ticket } from '~/components/domains/ticket/Ticket'

export type TicketDTO = {
	id: string
	username: string
	name: string
	start: string
	end: string
	status: string
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
	username: ticket.username,
	name: ticket.title,
	start: ticket.startedAt.toISOString(),
	end: ticket.completedAt.toISOString(),
	status: ticket.status,
})
