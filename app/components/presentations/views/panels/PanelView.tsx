import { useState, useEffect } from 'react'

import { Outlet, useNavigate } from '@remix-run/react'

import { css } from 'styled-system/css'

type PanelViewProps = {
	tabs: {
		title: string
		path: string
	}[]
	isProjectSelected: boolean
}

export function PanelView({ tabs, isProjectSelected }: PanelViewProps) {
	const [selectedTab, setSelectedTab] = useState(tabs[0]?.path || '')
	const navigate = useNavigate()

	const handleTabClick = (path: string) => {
		setSelectedTab(path)
		navigate(path)
	}

	useEffect(() => {
		if (tabs.length > 0) {
			setSelectedTab(tabs[0].path)
		}
	}, [tabs])

	return (
		<div className={css({ w: '100%' })}>
			<div role="tablist">
				{tabs.map((tab) => (
					<button
						key={tab.title}
						role="tab"
						aria-selected={selectedTab === tab.path}
						onClick={() => handleTabClick(tab.path)}
						tabIndex={0}
						disabled={!isProjectSelected}
					>
						{tab.title}
					</button>
				))}
			</div>

			<div className="window" role="tabpanel">
				<div
					className={css({
						minH: '62vh',
						maxH: '62vh',
						overflowY: 'auto',
						p: '4',
					})}
				>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
