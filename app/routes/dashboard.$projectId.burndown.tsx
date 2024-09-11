import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'

import { createTicketController } from '~/components/presentations/controllers/ticketController'
import BurndownChart from '~/components/presentations/views/panels/BurndownChart'

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	const { projectId } = params
	//現在のプロジェクトのアクティブチケットを取得
	const ticketController = createTicketController()
	const data = await ticketController.getProjectTickets(projectId!, 'all')
	return data
}

export default function Index() {
	const data = useLoaderData<typeof clientLoader>()

	return (
		<div>
			<BurndownChart tickets={data} />
		</div>
	)
}
