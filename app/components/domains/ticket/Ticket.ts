import { TicketSaveDTO } from '~/components/applications/dto/ticketDTO'

export enum TicketStatus {
	PENDING = 'pending',
	ACTIVE = 'active',
	CANCELLED = 'cancelled',
	RESOLVED = 'resolved',
}

export enum TicketPriority {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High',
	Critical = 'Critical',
}

export enum TicketDifficulty {
	Simple = '1 - Simple',
	Basic = '2 - Basic',
	Intermediate = '3 - Intermediate',
	Advanced = '5 - Advanced',
	Challenging = '8 - Challenging',
	Complex = '13 - Complex',
	Difficult = '21 - Difficult',
	Extreme = '34 - Extreme',
}

export function fromStringToTicketStatus(
	value: string
): TicketStatus | undefined {
	return Object.values(TicketStatus).find((status) => status === value)
}

export function fromStringToTicketPriority(
	value: string
): TicketPriority | undefined {
	return Object.values(TicketPriority).find((priority) => priority === value)
}

function fromStringToTicketDifficulty(
	value: string
): TicketDifficulty | undefined {
	return Object.values(TicketDifficulty).find(
		(difficulty) => difficulty === value
	)
}

export function fromNumberToTicketDifficulty(
	value: number | null
): TicketDifficulty | undefined {
	return Object.values(TicketDifficulty).find((difficulty) => {
		// Split the TicketDifficulty string and check if the number matches
		const numericValue = parseInt(difficulty.split(' - ')[0], 10)
		return numericValue === value
	})
}

export function fromTicketDifficultyToNumber(
	difficulty?: TicketDifficulty
): number | undefined {
	if (difficulty === undefined) {
		return undefined // undefined の場合はそのまま返す
	}

	const difficultyValue = difficulty.split(' - ')[0] // "1 - Simple" から "1" を取得
	return parseInt(difficultyValue, 10) // 数値に変換
}
export function fromSaveDtoToTicket(data: TicketSaveDTO): Ticket {
	return {
		id: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		title: data.title,
		description: data.description,
		username: data.username,
		difficulty: fromStringToTicketDifficulty(data.difficulty),
		projectId: data.projectId,
		status: TicketStatus.PENDING,
		priority: fromStringToTicketPriority(data.priority),
		startedAt: new Date(),
		completedAt: new Date(),
	}
}

// TicketStatus を小文字の文字列に変換する関数
export function fromTicketStatusToString(
	status?: TicketStatus
): string | undefined {
	if (status === undefined) {
		return undefined // undefined の場合はそのまま返す
	}

	return status.toLowerCase() // 小文字に変換して返す
}

// TicketPriority を小文字の文字列に変換する関数
export function fromTicketPriorityToString(
	priority?: TicketPriority
): string | undefined {
	if (priority === undefined) {
		return undefined // undefined の場合はそのまま返す
	}

	return priority.toLowerCase() // 小文字に変換して返す
}

export type Ticket = {
	id: string | undefined
	createdAt: Date
	updatedAt: Date
	title: string
	description: string | null
	username: string
	status: TicketStatus
	priority?: TicketPriority
	difficulty?: TicketDifficulty
	projectId?: string | undefined
	startedAt: Date
	completedAt: Date
}
