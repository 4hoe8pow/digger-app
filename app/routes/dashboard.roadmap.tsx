import { useState } from 'react'

import { Modal } from '~/components/presentations/views/Modal'
import { TicketForm } from '~/components/presentations/views/TicketForm'

import { grid, gridItem } from 'styled-system/patterns'

export default function Index() {
	const [isModalOpen, setModalOpen] = useState(false)

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
		</div>
	)
}
