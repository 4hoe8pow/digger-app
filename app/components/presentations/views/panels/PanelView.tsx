import { useState } from 'react'

import { Outlet, useNavigate } from '@remix-run/react'

import { css } from 'styled-system/css'

type PanelViewProps = {
	tabs: {
		title: string
		path: string // pathを追加
	}[]
}

export function PanelView({ tabs }: PanelViewProps) {
	const [selectedTab, setSelectedTab] = useState(tabs[0].path) // 初期選択は最初のタブのパス
	const navigate = useNavigate()

	const handleTabClick = (path: string) => {
		setSelectedTab(path)
		navigate(path) // タブクリック時にルーティングを行う
	}

	return (
		<div className={css({ w: '100%' })}>
			<div role="tablist">
				{tabs.map((tab) => (
					<button
						key={tab.title}
						role="tab"
						aria-selected={selectedTab === tab.path}
						onClick={() => handleTabClick(tab.path)} // クリックでルーティング
						tabIndex={0}
					>
						{tab.title}
					</button>
				))}
			</div>

			<div className="window" role="tabpanel">
				<div className={css({ minH: '500', p: '4' })}>
					{/* Nested route content will be rendered here */}
					<Outlet />
				</div>
			</div>
		</div>
	)
}
