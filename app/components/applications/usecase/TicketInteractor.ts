import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import {
	Ticket,
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

import { TicketInputPort } from '../input/TicketInputPort'
import { TicketOutputPort } from '../output/TicketOutputPort'

export const ticketInteractor = (
	ticketRepository: ITicketRepository,
	outputPort: TicketOutputPort
): TicketInputPort => ({
	async createTicket(
		projectId: number,
		title: string,
		description: string | null,
		status: TicketStatus,
		priority: TicketPriority
	) {
		const ticket: Ticket = {
			id: 0, // This will be assigned by the database
			createdAt: new Date(),
			updatedAt: new Date(),
			title,
			description,
			projectId,
			status,
			priority,
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
		id: number,
		title?: string,
		description?: string | null,
		status?: TicketStatus,
		priority?: TicketPriority
	) {
		ticketRepository
			.findById(id)
			.then((ticket) => {
				if (!ticket) throw new Error('Ticket not found')

				if (title) ticket.changeTitle(title)
				if (description !== undefined) ticket.description = description
				if (status) ticket.changeStatus(status)
				if (priority) ticket.changePriority(priority)

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

	async deleteTicket(id: number) {
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

	async getTicketById(id: number) {
		ticketRepository
			.findById(id)
			.then((ticket) => {
				if (!ticket) throw new Error('Ticket not found')
				outputPort.presentTicket(ticket)
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async getTicketsByProjectId(projectId: number) {
		ticketRepository
			.findByProjectId(projectId)
			.then((tickets) => outputPort.presentTickets(tickets))
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},
})
