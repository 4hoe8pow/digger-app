import { withValibot } from '@rvf/valibot'
import {
	enum_,
	maxLength,
	minLength,
	object,
	string,
	pipe,
	InferOutput,
	date,
	optional,
} from 'valibot'

import {
	TicketDifficulty,
	TicketPriority,
	TicketStatus,
} from '~/components/domains/ticket/Ticket'

const titleSchema = pipe(
	string(),
	minLength(2, 'Title must be at least 2 characters long.')
)

const descriptionSchema = pipe(
	string(),
	minLength(10, 'Description must be at least 10 characters long.'),
	maxLength(300, 'Description cannot exceed 300 characters.')
)

const effortEstimateSchema = enum_(TicketDifficulty)
const prioritySchema = enum_(TicketPriority)
const statusSchema = enum_(TicketStatus)
const completedAtSchema = optional(date())

export const ticketSchema = object({
	title: titleSchema,
	description: descriptionSchema,
	difficulty: effortEstimateSchema,
	priority: prioritySchema,
	status: statusSchema,
	completedAt: completedAtSchema,
})

export type TicketSchemaType = InferOutput<typeof ticketSchema>

export const validator = withValibot(ticketSchema)

export const ticketDefaultValue: TicketSchemaType = {
	description: '',
	title: '',
	difficulty: TicketDifficulty.Simple,
	priority: TicketPriority.Medium,
	status: TicketStatus.PENDING,
	completedAt: undefined,
}

type Option = {
	value: TicketDifficulty | TicketPriority | TicketStatus
	label: string
}

export const getEffortOptions = (): Option[] => {
	return Object.values(TicketDifficulty).map((value) => {
		const [numericValue, ...labelParts] = value.split(' - ')
		const label = `${numericValue} - ${labelParts.join(' - ')}`
		return { value, label }
	})
}

export const getPriorityOptions = (): Option[] => {
	return Object.values(TicketPriority).map((value) => ({
		value,
		label: value,
	}))
}

export const getStatusOptions = (): Option[] => {
	return Object.values(TicketStatus).map((value) => ({
		value,
		label: value,
	}))
}
