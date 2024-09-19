import { TicketViewDTO } from '../dto/ticketDTO'

export type TicketOutputPort = {
	presentTicket: (ticket: TicketViewDTO) => void
	presentTickets: (tickets: TicketViewDTO[]) => void
	presentTicketCreationSuccess: () => void
	presentTicketUpdateSuccess: () => void
	presentTicketDeletionSuccess: () => void
	presentError: (error: Error) => void
}
