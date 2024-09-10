import { useState } from 'react'

import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'

import { createTicketController } from '~/components/presentations/controllers/ticketController'
import { Modal } from '~/components/presentations/views/Modal'
import { TicketForm } from '~/components/presentations/views/TicketForm'
import RoadmapChart from '~/components/presentations/views/panels/RoadmapChart'

import { grid, gridItem } from 'styled-system/patterns'

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	const { projectId } = params
	//現在のプロジェクトのアクティブチケットを取得
	const ticketController = createTicketController()
	const data = await ticketController.getActiveTickets(projectId!)
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
