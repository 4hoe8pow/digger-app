import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import { Ticket, fromSaveDtoToTicket } from '~/components/domains/ticket/Ticket'

import {
	EventsLogDTO,
	fromTicketToTicketViewDTO,
	TicketSaveDTO,
	TicketViewDTO,
} from '../dto/ticketDTO'
import { ITicketQueryService, TicketInputPort } from '../input/TicketInputPort'
import { TicketOutputPort } from '../output/TicketOutputPort'

export const ticketInteractor = (
	ticketRepository: ITicketRepository,
	ticketQueryService: ITicketQueryService,
	outputPort: TicketOutputPort
): TicketInputPort => ({
	async saveTicket(data: TicketSaveDTO) {
		const ticket: Ticket = fromSaveDtoToTicket(data)
		ticketRepository
			.save(ticket)
			.then(() => outputPort.presentTicketCreationSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async deleteTicket(id: string) {
		ticketRepository
			.deleteById(id)
			.then(() => outputPort.presentTicketDeletionSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async getTicketById(id: string) {
		ticketRepository
			.findById(id)
			.then((ticket) => {
				if (!ticket) throw new Error('Ticket not found')
				outputPort.presentTicket(fromTicketToTicketViewDTO(ticket))
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async findActiveTickets(projectId: string): Promise<TicketViewDTO[]> {
		return ticketRepository
			.findActiveTickets(projectId)
			.then((tickets) => {
				const ticketDTOs = tickets.map(fromTicketToTicketViewDTO)
				outputPort.presentTickets(ticketDTOs)
				return ticketDTOs
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
				return []
			})
	},

	async getEventsLog(projectId: string): Promise<EventsLogDTO[]> {
		return ticketQueryService
			.getEventsLog(projectId)
			.then((eventsLog) => {
				return eventsLog
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
				return []
			})
	},

	async findProjectTickets(projectId: string): Promise<TicketViewDTO[]> {
		return ticketRepository
			.findProjectTickets(projectId)
			.then((tickets) => {
				const ticketDTOs = tickets.map(fromTicketToTicketViewDTO)
				outputPort.presentTickets(ticketDTOs)
				return ticketDTOs
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
				return []
			})
	},
})
