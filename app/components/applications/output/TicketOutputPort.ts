import { Ticket } from '~/components/domains/ticket/Ticket'

export type TicketOutputPort = {
	presentTicket: (ticket: Ticket) => void
	presentTickets: (tickets: Ticket[]) => void
	presentTicketCreationSuccess: () => void
	presentTicketUpdateSuccess: () => void
	presentTicketDeletionSuccess: () => void
	presentError: (error: Error) => void
}
