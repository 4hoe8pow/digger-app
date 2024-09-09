import { useLoaderData } from '@remix-run/react'

import { assignController } from '~/entry.client'

import { css } from 'styled-system/css'
import { grid, gridItem } from 'styled-system/patterns'

export type ProjectData = {
	title: string
}

export type MemberData = {
	name: string
	open: number
	resolved: number
	joined: string
}

export async function clientLoader() {
	//自分がjoinしているプロジェクトをすべて取得
	const data = await assignController.getProjectsByMe()
	return data
}

export default function Index() {
	const data = useLoaderData<typeof clientLoader>()
	return (
		<div className={grid({ columns: 12, gap: '6' })}>
			<div className={gridItem({ colSpan: 3 })}>Project</div>
			<div className={gridItem({ colSpan: 9 })}>
				<select className={css({ w: '100%' })}>
					{data.map((project) => (
						<option key={project.id} value={project.id}>
							{project.name}
						</option>
					))}
				</select>
			</div>
			{/*
			<div className={gridItem({ colSpan: 12 })}>
				<table className={css({ w: '100%' })}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Open</th>
							<th>Resolved</th>
							<th>Joined</th>
						</tr>
					</thead>
					<tbody>
						{memberData.map((row, index) => (
							<tr key={index}>
								<td>{row.name}</td>
								<td>{row.open}</td>
								<td>{row.resolved}</td>
								<td>{row.joined}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			*/}
		</div>
	)
}
