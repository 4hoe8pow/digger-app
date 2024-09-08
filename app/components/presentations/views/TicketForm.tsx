import { useForm, getInputProps, getFormProps } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useActionData, Form, ClientActionFunctionArgs } from '@remix-run/react'

import { ticketSchema } from './validation/ticketSchema'

type Props = {
	onClose: () => void
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
	const formData = await request.formData()
	const payload = parseWithZod(formData, { schema: ticketSchema })
	const result = ticketSchema.safeParse(payload)
	// eslint-disable-next-line no-console
	console.log(result)
	return result
}

export function TicketForm({ onClose }: Props) {
	const lastResult = useActionData<typeof clientAction>()
	const [form, fields] = useForm({
		lastResult,
		//クライアントバリデーション
		onValidate: ({ formData }) =>
			parseWithZod(formData, { schema: ticketSchema }),
		constraint: getZodConstraint(ticketSchema),
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">Create New Ticket</div>
				<div className="title-bar-controls">
					<button aria-label="Close" onClick={onClose}></button>
				</div>
			</div>
			<div className="window-body">
				<Form method="post" {...getFormProps(form)}>
					<div>
						<label htmlFor="title">Title</label>
						<input
							{...getInputProps(fields.title, {
								type: 'text',
							})}
						/>
						<div>{fields.title.errors}</div>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<textarea
							{...getInputProps(fields.description, {
								type: 'text',
							})}
						/>
						<div>{fields.description.errors}</div>
					</div>
					<button type="submit">Submit</button>
				</Form>
			</div>
		</div>
	)
}
