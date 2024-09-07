import { Ticket } from './Ticket'

export type ITicketRepository = {
	findById: (id: number) => Promise<Ticket | null>
	findByProjectId: (projectId: number) => Promise<Ticket[]>
	save: (ticket: Ticket) => Promise<void>
	deleteById: (id: number) => Promise<void>
}
