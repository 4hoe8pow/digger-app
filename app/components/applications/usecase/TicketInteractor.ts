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
		projectId: string,
		title: string,
		description: string | null,
		status: TicketStatus,
		priority: TicketPriority,
		userId: string,
		effortEstimate: number
	) {
		const ticket: Ticket = {
			id: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			title,
			description,
			projectId,
			userId,
			effortEstimate,
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
			changeUserId: (newUserId: string) => ({
				...ticket,
				userId: newUserId,
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
		projectId?: string,
		title?: string,
		description?: string | null,
		status?: TicketStatus,
		priority?: TicketPriority,
		userId?: string,
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
				if (userId) ticket = ticket.changeUserId(userId) // Use changeUserId method
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

	async getTicketsByProjectId(projectId: string) {
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
