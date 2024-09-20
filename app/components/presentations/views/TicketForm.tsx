import { useActionData } from '@remix-run/react'
import { isValidationErrorResponse, useForm } from '@rvf/remix'

import { clientAction } from '~/routes/dashboard.$projectId.$username.roadmap'

import {
	getEffortOptions,
	getPriorityOptions,
	getStatusOptions,
	ticketDefaultValue,
	validator,
} from './validation/ticketSchema'

import { css } from 'styled-system/css'
import { flex, grid, gridItem } from 'styled-system/patterns'

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

type SelectFieldProps = {
	label: string
	error?: string | null
	options: { value: string; label: string }[]
	inputProps: React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	>
}

export function SelectField({
	label,
	error,
	options,
	inputProps,
}: SelectFieldProps) {
	return (
		<div className={grid({ columns: 12, columnGap: '1', rowGap: '0.5' })}>
			{/* Label */}
			<div className={gridItem({ colSpan: 4 })}>
				<label
					htmlFor={inputProps.id}
					className={css({ fontWeight: 'bold' })}
				>
					{label}
				</label>
			</div>
			{/* Select */}
			<div className={gridItem({ colSpan: 8 })}>
				<select {...inputProps} className={css({ w: '100%' })}>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			{/* Error */}
			<div
				className={gridItem({
					colSpan: 12,
					textAlign: 'right',
					color: 'red.500',
				})}
			>
				{error && <span>{error}</span>}
			</div>
		</div>
	)
}

export function InputField({ label, error, inputProps }: InputFieldProps) {
	return (
		<div className={grid({ columns: 12, columnGap: '1' })}>
			{/* Label */}
			<div className={gridItem({ colSpan: 4 })}>
				<label
					htmlFor={inputProps.id}
					className={css({ fontWeight: 'bold' })}
				>
					{label}
				</label>
			</div>
			{/* Input */}
			<div className={gridItem({ colSpan: 8 })}>
				<input {...inputProps} className={css({ w: '100%' })} />
			</div>
			{/* Error */}
			<div
				className={gridItem({
					colSpan: 12,
					textAlign: 'right',
					color: 'red.500',
				})}
			>
				{error && <span>{error}</span>}
			</div>
		</div>
	)
}

export function TextAreaField({
	label,
	error,
	inputProps,
}: TextAreaFieldProps) {
	return (
		<div className={grid({ columns: 12, columnGap: '1', rowGap: '0.5' })}>
			{/* Label */}
			<div className={gridItem({ colSpan: 4 })}>
				<label
					htmlFor={inputProps.id}
					className={css({ fontWeight: 'bold' })}
				>
					{label}
				</label>
			</div>
			{/* TextArea */}
			<div className={gridItem({ colSpan: 8 })}>
				<textarea
					{...inputProps}
					className={css({ w: '100%', minH: '10rem' })}
				/>
			</div>
			{/* Error */}
			<div
				className={gridItem({
					colSpan: 12,
					textAlign: 'right',
					color: 'red.500',
				})}
			>
				{error && <span>{error}</span>}
			</div>
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

	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">Open New Ticket</div>
				<div className="title-bar-controls">
					<button aria-label="Close" onClick={onClose}></button>
				</div>
			</div>
			<div className="window-body">
				<form
					method="post"
					{...form.getFormProps()}
					className={flex({ direction: 'column', rowGap: '8' })}
				>
					<InputField
						label="Title"
						inputProps={{
							...form.getInputProps('title'),
							id: 'title',
							type: 'text',
						}}
						error={form.error('title') ?? undefined}
					/>
					<TextAreaField
						label="Description"
						inputProps={{
							...form.getInputProps('description'),
							id: 'description',
						}}
						error={form.error('description') ?? undefined}
					/>
					<SelectField
						label="Estimate Effort"
						inputProps={{
							...form.getInputProps('difficulty'),
							id: 'difficulty',
						}}
						options={getEffortOptions()}
						error={form.error('difficulty') ?? undefined}
					/>
					<SelectField
						label="Priority"
						inputProps={{
							...form.getInputProps('priority'),
							id: 'priority',
						}}
						options={getPriorityOptions()}
						error={form.error('priority') ?? undefined}
					/>
					<SelectField
						label="Status"
						inputProps={{
							...form.getInputProps('status'),
							id: 'status',
						}}
						options={getStatusOptions()}
						error={form.error('status') ?? undefined}
					/>
					<div className={css({ textAlign: 'right' })}>
						<button
							type="submit"
							disabled={form.formState.isSubmitting}
							className={css({ w: '38%' })}
						>
							OPEN
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
