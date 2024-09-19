import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'

import { createProjectController } from '~/components/presentations/controllers/projectController'

import { grid } from 'styled-system/patterns'

export type ProjectData = {
	title: string
}

export type MemberData = {
	name: string
	open: number
	resolved: number
	joined: string
}

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	const { projectId } = params
	//自分がjoinしているプロジェクトをすべて取得
	const projectController = createProjectController()
	const data = await projectController.getProject(projectId!)
	return data
}

export default function Index() {
	const data = useLoaderData<typeof clientLoader>()

	return (
		<div className={grid({ columns: 12, gap: '6' })}>
			<>{data.name}</>
		</div>
	)
}
