import { useEffect, useState } from 'react'

import {
	SignedIn,
	UserButton,
	SignOutButton,
	SignedOut,
	SignInButton,
	SignUpButton,
	useUser,
} from '@clerk/remix'

import { ProjectDTO } from '~/components/applications/dto/projectDTO'
import { createAssignmentController } from '~/components/presentations/controllers/assignmentController'
import { PanelView } from '~/components/presentations/views/panels/PanelView'
import TimelineView from '~/components/presentations/views/timeline/TimelineView'

import { css } from 'styled-system/css'

// サンプルアクティビティデータ
export const activities = [
	{
		title: 'Task Created',
		content: 'A new task has been created.',
		userName: 'Alice',
		timestamp: '2024-09-05T10:00:00Z',
	},
	{
		title: 'Task Updated',
		content: 'Task status updated to "In Progress".',
		userName: 'Bob',
		timestamp: '2024-09-05T11:15:00Z',
	},
	{
		title: 'Comment Added',
		content: 'Added a comment to task #42.',
		userName: 'Carol',
		timestamp: '2024-09-05T12:30:00Z',
	},
	{
		title: 'Task Completed',
		content: 'Task #27 has been marked as completed.',
		userName: 'Dave',
		timestamp: '2024-09-05T13:45:00Z',
	},
	{
		title: 'Project Milestone Reached',
		content: 'The project milestone "Beta Release" has been reached.',
		userName: 'Eve',
		timestamp: '2024-09-05T14:00:00Z',
	},
]

export default function Index() {
	const { isSignedIn, user } = useUser()
	const [projects, setProjects] = useState<ProjectDTO[]>([])
	const [selectedProjectId, setSelectedProjectId] = useState<string>('')

	useEffect(() => {
		if (!isSignedIn || !user) return

		// 自分がjoinしているプロジェクトを取得
		const assignController = createAssignmentController()

		assignController
			.getProjectsByUsername(user.username!)
			.then((data) => setProjects(data))
			// eslint-disable-next-line no-console
			.catch((error) => console.error('Error fetching projects:', error))
	}, [isSignedIn, user])

	if (!isSignedIn) {
		return null
	}

	const tabs = [
		{ title: 'Overview', path: user.username + '/overview' },
		{ title: 'Roadmap', path: selectedProjectId + '/roadmap' },
		{ title: 'Burndown', path: user.username + '/burndown' },
		{ title: 'Log', path: user.username + '/log' },
		{
			title: 'Project Settings',
			path: user.username + '/project-settings',
		},
	]

	const handleProjectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedProjectId(event.target.value)
	}

	return (
		<div>
			<SignedIn>
				<div>
					<UserButton />
				</div>
				<div>
					<SignOutButton />
				</div>
				<div
					className={css({
						display: 'flex',
						flexDirection: { base: 'column', sm: 'row' },
						justifyContent: 'center',
						gap: '8',
						p: '4',
					})}
				>
					<div
						className={css({
							width: { base: '100%', sm: '62%' },
						})}
					>
						<select
							className={css({ w: '100%' })}
							value={selectedProjectId}
							onChange={handleProjectChange}
						>
							{projects.map((project) => (
								<option key={project.id} value={project.id}>
									{project.name}
								</option>
							))}
						</select>
						<PanelView
							tabs={tabs}
							isProjectSelected={!!selectedProjectId}
						/>
					</div>
					<div
						className={css({
							width: { base: '100%', sm: '38%' },
						})}
					>
						<TimelineView activities={activities} />
					</div>
				</div>
			</SignedIn>
			<SignedOut>
				<div>
					<SignInButton />
				</div>
				<div>
					<SignUpButton />
				</div>
			</SignedOut>
		</div>
	)
}
