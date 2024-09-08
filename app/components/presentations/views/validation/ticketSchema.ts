import { z } from 'zod'

export const ticketSchema = z.object({
	title: z.preprocess(
		(value) => (value === '' ? undefined : value),
		z
			.string({ required_error: 'Title is required' })
			.min(1, 'Title is required')
	),
	description: z.preprocess(
		(value) => (value === '' ? undefined : value),
		z
			.string({ required_error: 'Description is required' })
			.min(10, 'Description is too short')
			.max(100, 'Description is too long')
	),
	status: z.preprocess(
		(value) => (value === '' ? undefined : value),
		z.enum(['New', 'In Progress', 'Completed'], {
			required_error: 'Status is required',
		})
	),
	assigneeId: z.preprocess(
		(value) => (value === '' ? undefined : value),
		z.string({ required_error: 'Assignee ID is required' })
	),
})
