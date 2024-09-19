import {
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

import { EventsLogDTO, TicketViewDTO } from '../dto/ticketDTO'

export type TicketInputPort = {
	findActiveTickets(projectId: string): Promise<TicketViewDTO[]>
	findProjectTickets(projectId: string): Promise<TicketViewDTO[]>
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
