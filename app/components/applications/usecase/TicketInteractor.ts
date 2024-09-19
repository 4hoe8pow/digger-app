import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import {
	Ticket,
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

import {
	EventsLogDTO,
	fromTicketToTicketViewDTO,
	TicketViewDTO,
} from '../dto/ticketDTO'
import { ITicketQueryService, TicketInputPort } from '../input/TicketInputPort'
import { TicketOutputPort } from '../output/TicketOutputPort'

export const ticketInteractor = (
	ticketRepository: ITicketRepository,
	ticketQueryService: ITicketQueryService,
	outputPort: TicketOutputPort
): TicketInputPort => ({
	async createTicket(
		projectId: string,
		title: string,
		description: string | null,
		status: TicketStatus,
		priority: TicketPriority,
		username: string,
		effortEstimate: number
	) {
		const ticket: Ticket = {
			id: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			title,
			description,
			username,
			effortEstimate,
			status,
			priority,
			startedAt: new Date(),
			completedAt: new Date(),
			changeTitle: (newTitle: string) => ({
				...ticket,
				title: newTitle,
				updatedAt: new Date(),
			}),
			changeStatus: (newStatus: TicketStatus) => ({
				...ticket,
				status: newStatus,
				updatedAt: new Date(),
			}),
			changePriority: (newPriority: TicketPriority) => ({
				...ticket,
				priority: newPriority,
				updatedAt: new Date(),
			}),
			changeUserId: (newUserId: string) => ({
				...ticket,
				username: newUserId,
				updatedAt: new Date(),
			}),
			changeEffortEstimate: (newEffortEstimate: number) => ({
				...ticket,
				effortEstimate: newEffortEstimate,
				updatedAt: new Date(),
			}),
		}
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

	async updateTicket(
		id: string,
		title?: string,
		description?: string | null,
		status?: TicketStatus,
		priority?: TicketPriority,
		username?: string,
		effortEstimate?: number
	) {
		ticketRepository
			.findById(id)
			.then((ticket) => {
				if (!ticket) throw new Error('Ticket not found')

				if (title) ticket = ticket.changeTitle(title)
				if (description !== undefined) ticket.description = description
				if (status) ticket = ticket.changeStatus(status)
				if (priority) ticket = ticket.changePriority(priority)
				if (username) ticket = ticket.changeUserId(username) // Use changeUserId method
				if (effortEstimate !== undefined)
					ticket = ticket.changeEffortEstimate(effortEstimate) // Use changeEffortEstimate method

				return ticketRepository.save(ticket)
			})
			.then(() => outputPort.presentTicketUpdateSuccess())
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
