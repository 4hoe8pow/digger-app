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

export type Ticket = {
	id: number
	createdAt: Date
	updatedAt: Date
	title: string
	description: string | null
	projectId: number
	status: TicketStatus
	priority: TicketPriority
	changeTitle: (newTitle: string) => Ticket
	changeStatus: (newStatus: TicketStatus) => Ticket
	changePriority: (newPriority: TicketPriority) => Ticket
}
