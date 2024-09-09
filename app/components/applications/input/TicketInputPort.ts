import {
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

export type TicketInputPort = {
	createTicket: (
		projectId: string,
		title: string,
		description: string | null,
		status: TicketStatus,
		priority: TicketPriority,
		userId: string,
		effortEstimate: number
	) => Promise<void>
	updateTicket: (
		id: string,
		projectId?: string,
		title?: string,
		description?: string | null,
		status?: TicketStatus,
		priority?: TicketPriority,
		userId?: string,
		effortEstimate?: number
	) => Promise<void>
	deleteTicket: (id: string) => Promise<void>
	getTicketById: (id: string) => Promise<void>
	getTicketsByProjectId: (projectId: string) => Promise<void>
}
