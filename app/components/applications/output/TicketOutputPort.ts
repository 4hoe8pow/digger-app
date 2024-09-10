import { TicketDTO } from '../dto/ticketDTO'

export type TicketOutputPort = {
	presentTicket: (ticket: TicketDTO) => void
	presentTickets: (tickets: TicketDTO[]) => void
	presentTicketCreationSuccess: () => void
	presentTicketUpdateSuccess: () => void
	presentTicketDeletionSuccess: () => void
	presentError: (error: Error) => void
}
