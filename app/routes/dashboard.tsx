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
import { activities } from 'tests/sample'

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
