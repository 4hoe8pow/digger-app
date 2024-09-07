import { css } from 'styled-system/css'
import { grid, gridItem } from 'styled-system/patterns'
import { defaultMemberData, defaultProjectData } from 'tests/sample'

export type ProjectData = {
	title: string
}

export type MemberData = {
	name: string
	open: number
	resolved: number
	joined: string
}

type IndexProps = {
	projectData: ProjectData
	memberData: MemberData[]
}

export default function Index({
	projectData = defaultProjectData,
	memberData = defaultMemberData,
}: IndexProps) {
	return (
		<div className={grid({ columns: 12, gap: '6' })}>
			<div className={gridItem({ colSpan: 3 })}>Project Title</div>
			<div className={gridItem({ colSpan: 9 })}>{projectData.title}</div>
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
		</div>
	)
}
