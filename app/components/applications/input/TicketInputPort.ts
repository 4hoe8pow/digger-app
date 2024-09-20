import { EventsLogDTO, TicketSaveDTO, TicketViewDTO } from '../dto/ticketDTO'

export type TicketInputPort = {
	findActiveTickets(projectId: string): Promise<TicketViewDTO[]>
	findProjectTickets(projectId: string): Promise<TicketViewDTO[]>
	saveTicket: (data: TicketSaveDTO) => Promise<void>
	deleteTicket: (id: string) => Promise<void>
	getTicketById: (id: string) => Promise<void>
	getEventsLog(projectId: string): Promise<EventsLogDTO[]>
}

export type ITicketQueryService = {
	getEventsLog: (projectId: string) => Promise<EventsLogDTO[]>
}
