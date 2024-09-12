import { useState } from 'react'

import {
	ClientActionFunctionArgs,
	ClientLoaderFunctionArgs,
	useLoaderData,
} from '@remix-run/react'
import { validationError } from '@rvf/remix'

import { createTicketController } from '~/components/presentations/controllers/ticketController'
import { Modal } from '~/components/presentations/views/Modal'
import { TicketForm } from '~/components/presentations/views/TicketForm'
import RoadmapChart from '~/components/presentations/views/panels/RoadmapChart'
import { validator } from '~/components/presentations/views/validation/ticketSchema'

import { grid, gridItem } from 'styled-system/patterns'

export async function clientAction({ request }: ClientActionFunctionArgs) {
	const result = await validator.validate(await request.formData())

	if (result.error) {
		return validationError(result.error, result.submittedData)
	}
	// eslint-disable-next-line no-console
	console.log('in-action:', result.data)
	return result.data
}

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	const { projectId } = params
	//現在のプロジェクトのアクティブチケットを取得
	const ticketController = createTicketController()
	const data = await ticketController.getProjectTickets(projectId!, 'active')
	return data
}

export default function Index() {
	const [isModalOpen, setModalOpen] = useState(false)
	const data = useLoaderData<typeof clientLoader>()

	return (
		<div className={grid({ columns: 12, gap: '6' })}>
			<button
				className={gridItem({ colEnd: 12, colStart: 10 })}
				onClick={() => setModalOpen(true)}
			>
				Open Ticket
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
				<TicketForm onClose={() => setModalOpen(false)} />
			</Modal>
			<div className={gridItem({ colEnd: 12, colStart: 1 })}>
				<RoadmapChart tickets={data} />
			</div>
		</div>
	)
}
