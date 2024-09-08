import {
	SignedIn,
	UserButton,
	SignOutButton,
	SignedOut,
	SignInButton,
	SignUpButton,
} from '@clerk/remix'

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
	const tabs = [
		{ title: 'Overview', path: 'overview' },
		{ title: 'Roadmap', path: 'roadmap' },
		{ title: 'Burndown', path: 'burndown' },
		{ title: 'Log', path: 'log' },
		{ title: 'Project Settings', path: 'project-settings' },
	]

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
						flexDir: 'row',
						justifyContent: 'center',
						gap: '8',
					})}
				>
					<PanelView tabs={tabs} />
					<TimelineView activities={activities} />
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
