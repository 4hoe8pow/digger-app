import { withValibot } from '@rvf/valibot'
import {
	literal,
	maxLength,
	minLength,
	object,
	string,
	pipe,
	description,
	InferOutput,
	date,
	optional,
} from 'valibot'

const titleSchema = pipe(string(), minLength(2))
const descriptionSchema = pipe(string(), minLength(10), maxLength(300))
const estimateEffortSchema = pipe(
	literal('2' || '3'),
	description('フィボナッチ見積')
)
const dueDateSchema = optional(date())

export const ticketSchema = object({
	title: titleSchema,
	description: descriptionSchema,
	estimateEffort: estimateEffortSchema,
	dueDate: dueDateSchema,
})

export type TicketSchemaType = InferOutput<typeof ticketSchema>

export const validator = withValibot(ticketSchema)

export const ticketDefaultValue: TicketSchemaType = {
	description: '',
	title: '',
	estimateEffort: '2',
	dueDate: undefined,
}
