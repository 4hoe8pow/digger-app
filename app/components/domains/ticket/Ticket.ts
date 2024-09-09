export enum TicketStatus {
	OPEN = 'open',
	CANCEL = 'cancel',
	CLOSED = 'closed',
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
	projectId: string
	userId: string
	status: TicketStatus
	priority: TicketPriority
	effortEstimate: number
	changeTitle: (newTitle: string) => Ticket
	changeStatus: (newStatus: TicketStatus) => Ticket
	changePriority: (newPriority: TicketPriority) => Ticket
	changeUserId: (newUserId: string) => Ticket
	changeEffortEstimate: (newEffortEstimate: number) => Ticket
}
