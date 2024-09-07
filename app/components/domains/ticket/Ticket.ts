import { Entity } from '../types/Entity'

export enum TicketStatus {
	OPEN = 'open',
	IN_PROGRESS = 'in_progress',
	CLOSED = 'closed',
}

export enum TicketPriority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export type Ticket = Entity & {
	title: string
	description?: string
	projectId: number
	status: TicketStatus
	priority: TicketPriority
	changeTitle: (newTitle: string) => Ticket
	changeStatus: (newStatus: TicketStatus) => Ticket
	changePriority: (newPriority: TicketPriority) => Ticket
}
