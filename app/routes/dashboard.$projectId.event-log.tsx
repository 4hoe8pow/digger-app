import { diffMilliseconds } from '@formkit/tempo'
import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'

import { createTicketController } from '~/components/presentations/controllers/ticketController'

import { grid } from 'styled-system/patterns'

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	const { projectId } = params
	//現在のプロジェクトのアクティブチケットを取得
	const ticketController = createTicketController()
	const data = await ticketController.getEventsLog(projectId!)
	return data
}

export default function Index() {
	const data = useLoaderData<typeof clientLoader>()
	const styles = {
		container: grid({ columns: 1, gap: '1', w: '62%' }),
	}

	const sortedHistory = data
		.slice()
		.sort((a, b) => diffMilliseconds(b.eventTime, a.eventTime))

	return (
		<div className={styles.container}>
			{sortedHistory.map((item) => (
				<div key={item.id} className="window">
					<header className="status-bar">
						<p className="status-bar-field">
							{' '}
							{item.eventTime.toISOString()}
						</p>
						<p className="status-bar-field">{item.eventType}</p>
						<p className="status-bar-field">{item.username}</p>
					</header>
					<div className="window-body">
						{item.details || 'No details available'}
					</div>
				</div>
			))}
		</div>
	)
}
