import { useActionData } from '@remix-run/react'
import { isValidationErrorResponse, useForm } from '@rvf/remix'

import { clientAction } from '~/routes/dashboard.$projectId.roadmap'

import { ticketDefaultValue, validator } from './validation/ticketSchema'

type InputFieldProps = {
	label: string
	error?: string | null
	inputProps: React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
}

type TextAreaFieldProps = {
	label: string
	error?: string | null
	inputProps: React.DetailedHTMLProps<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>
}

export function InputField({ label, error, inputProps }: InputFieldProps) {
	return (
		<div>
			<label htmlFor={inputProps.id}>
				{label}
				<input {...inputProps} />
			</label>
			{error && <span>{error}</span>}
		</div>
	)
}

export function TextAreaField({
	label,
	error,
	inputProps,
}: TextAreaFieldProps) {
	return (
		<div>
			<label htmlFor={inputProps.id}>
				{label}
				<textarea {...inputProps} />
			</label>
			{error && <span>{error}</span>}
		</div>
	)
}

type Props = {
	onClose: () => void
}

export function TicketForm({ onClose }: Props) {
	const data = useActionData<typeof clientAction>()
	const form = useForm({
		validator,
		defaultValues: ticketDefaultValue,
		onSubmitSuccess: () => {
			if (isValidationErrorResponse(data)) return
			form.resetForm()
		},
		method: 'post',
	})

	const titleError = form.error('title') ?? undefined
	const descriptionError = form.error('description') ?? undefined

	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">Create New Ticket</div>
				<div className="title-bar-controls">
					<button aria-label="Close" onClick={onClose}></button>
				</div>
			</div>
			<div className="window-body">
				<form method="post" {...form.getFormProps()}>
					<InputField
						label="Title"
						inputProps={{
							...form.getInputProps('title'),
							id: 'title',
							type: 'text',
						}}
						error={titleError}
					/>
					<TextAreaField
						label="Description"
						inputProps={{
							...form.getInputProps('description'),
							id: 'description',
						}}
						error={descriptionError}
					/>
					<InputField
						label="Estimate Effort"
						inputProps={{
							...form.getInputProps('estimateEffort'),
							id: 'estimateEffort',
							type: 'text',
						}}
					/>
					<button
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						CREATE
					</button>
				</form>
			</div>
		</div>
	)
}
