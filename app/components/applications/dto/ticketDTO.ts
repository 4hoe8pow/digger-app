import { Ticket } from '~/components/domains/ticket/Ticket'
import { TicketSchemaType } from '~/components/presentations/views/validation/ticketSchema'

// 閲覧取得用
export type TicketViewDTO = {
	id: string
	username: string
	status: string
	title: string
	description: string
	difficulty: string
	priority: string
	startedAt: string
	completedAt: string
}

// 登録更新用
export type TicketSaveDTO = {
	id?: string
	username: string
	status: string
	title: string
	description: string
	difficulty: string
	priority: string
	projectId: string
	startedAt?: string
	completedAt?: string
}

export type EventsLogDTO = {
	id: string
	eventType: string
	username: string
	eventTime: Date
	details?: string
}

export function fromTicketToTicketViewDTO(ticket: Ticket): TicketViewDTO {
	return {
		id: ticket.id!,
		username: ticket.username,
		status: ticket.status, // Convert enum to string directly
		title: ticket.title,
		description: ticket.description || '', // Use empty string if null
		difficulty: ticket.difficulty || '', // Convert enum to string
		priority: ticket.priority || '', // Convert enum to string
		startedAt: ticket.startedAt.toISOString(), // Convert Date to string
		completedAt: ticket.completedAt.toISOString(), // Convert Date to string
	}
}

export function fromTicketSchemaToTicketSaveDTO(
	schema: TicketSchemaType,
	username: string,
	projectId: string,
	startedAt?: Date
): TicketSaveDTO {
	return {
		id: undefined,
		username,
		status: schema.status,
		title: schema.title,
		description: schema.description || '', // Use empty string if null
		difficulty: schema.difficulty.toString(), // Convert enum to string if necessary
		priority: schema.priority.toString(),
		projectId: projectId,
		startedAt: startedAt ? startedAt.toISOString() : undefined, // Convert Date to string
		completedAt: schema.completedAt
			? schema.completedAt.toISOString()
			: undefined, // Convert Date to string
	}
}
