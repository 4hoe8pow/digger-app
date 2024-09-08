import {
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

export type TicketInputPort = {
	createTicket: (
		projectId: number,
		title: string,
		description: string | null,
		status: TicketStatus,
		priority: TicketPriority
	) => Promise<void>
	updateTicket: (
		id: number,
		title?: string,
		description?: string | null,
		status?: TicketStatus,
		priority?: TicketPriority
	) => Promise<void>
	deleteTicket: (id: number) => Promise<void>
	getTicketById: (id: number) => Promise<void>
	getTicketsByProjectId: (projectId: number) => Promise<void>
}
