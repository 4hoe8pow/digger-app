import {
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

import { EventsLogDTO, TicketDTO } from '../dto/ticketDTO'

export type TicketInputPort = {
	findActiveTickets(projectId: string): Promise<TicketDTO[]>
	findProjectTickets(projectId: string): Promise<TicketDTO[]>
	createTicket: (
		projectId: string,
		title: string,
		description: string | null,
		status: TicketStatus,
		priority: TicketPriority,
		username: string,
		effortEstimate: number
	) => Promise<void>
	updateTicket: (
		id: string,
		title?: string,
		description?: string | null,
		status?: TicketStatus,
		priority?: TicketPriority,
		username?: string,
		effortEstimate?: number
	) => Promise<void>
	deleteTicket: (id: string) => Promise<void>
	getTicketById: (id: string) => Promise<void>
	getEventsLog(projectId: string): Promise<EventsLogDTO[]>
}

export type ITicketQueryService = {
	getEventsLog: (projectId: string) => Promise<EventsLogDTO[]>
}
