export enum TicketStatus {
	PENDING = 'pending',
	ACTIVE = 'active',
	CANCELLED = 'cancelled',
	RESOLVED = 'resolved',
}

export enum TicketPriority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export type Ticket = {
	id: string
	createdAt: Date
	updatedAt: Date
	title: string
	description: string | null
	username: string
	status: TicketStatus
	priority: TicketPriority
	effortEstimate: number
	startedAt: Date
	completedAt: Date
	changeTitle: (newTitle: string) => Ticket
	changeStatus: (newStatus: TicketStatus) => Ticket
	changePriority: (newPriority: TicketPriority) => Ticket
	changeUserId: (newUserId: string) => Ticket
	changeEffortEstimate: (newEffortEstimate: number) => Ticket
}
