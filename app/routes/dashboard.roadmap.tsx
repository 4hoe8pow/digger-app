import { Link } from '@remix-run/react'

import { grid, gridItem } from 'styled-system/patterns'

export default function Index() {
	return (
		<div className={grid({ columns: 12, gap: '6' })}>
			<button className={gridItem({ colEnd: 12, colStart: 10 })}>
				Open Ticket
			</button>
			<Link to="/a-link">Click me</Link>
		</div>
	)
}
