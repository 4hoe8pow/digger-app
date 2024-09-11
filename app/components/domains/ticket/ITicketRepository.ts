import { Ticket } from './Ticket'

export type ITicketRepository = {
	findById: (id: string) => Promise<Ticket | null>
	findActiveTickets: (projectId: string) => Promise<Ticket[]>
	findProjectTickets: (projectId: string) => Promise<Ticket[]>
	save: (ticket: Ticket) => Promise<void>
	deleteById: (id: string) => Promise<void>
}
