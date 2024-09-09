import Activity, { ActivityProps } from './Activity'

import { stack } from 'styled-system/patterns'

type TimelineViewProps = {
	activities: ActivityProps[]
}

export default function TimelineView({ activities }: TimelineViewProps) {
	return (
		<div className={stack({ gap: '6', w: '100%' })}>
			{activities.map((activity, index) => (
				<Activity
					key={index}
					title={activity.title}
					content={activity.content}
					userName={activity.userName}
					timestamp={activity.timestamp}
				/>
			))}
		</div>
	)
}
