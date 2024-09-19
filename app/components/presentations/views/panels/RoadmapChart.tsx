import { parse, diffDays, format } from '@formkit/tempo'

import { TicketViewDTO } from '~/components/applications/dto/ticketDTO'

import { css } from 'styled-system/css'

interface RoadmapChartProps {
	tickets: TicketViewDTO[]
}

// Helper function to get the date range from tickets
const getDateRange = (tickets: TicketViewDTO[]) => {
	const dates = tickets.flatMap(({ start, end }) =>
		[start, end].map((d) => parse(d).getTime())
	)
	return {
		startDate: new Date(Math.min(...dates)),
		endDate: new Date(Math.max(...dates)),
	}
}

const RoadmapChart = ({ tickets }: RoadmapChartProps) => {
	const { startDate, endDate } = getDateRange(tickets)
	// Create the date range array
	const dateRange = Array.from(
		{
			length: diffDays(endDate, startDate) + 1,
		},
		(_, i) => {
			const date = new Date(startDate)
			date.setDate(startDate.getDate() + i)
			return {
				date,
				formatted: format(date, 'M/D', 'en'),
			}
		}
	)

	const styles = {
		container: css({
			overflowX: 'auto',
			maxW: '100%',
		}),
		table: css({
			w: '100%',
			borderCollapse: 'collapse',
			tableLayout: 'auto',
		}),
		headerCell: css({
			border: '1px solid #ddd',
			textAlign: 'center',
		}),
		cell: css({
			borderRight: '1px dashed #ddd',
		}),
		fixedColumn: css({
			borderRight: '1px solid #ddd',
			pos: 'sticky',
			left: 0,
			zIndex: 1,
		}),
		highlightedCell: css({
			bg: '#ffbe98',
		}),
	}

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.fixedColumn} />
						{dateRange.map(({ formatted }, index) => (
							<th key={index} className={styles.headerCell}>
								{formatted}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tickets.map(({ id, name, start, end }) => {
						return (
							<tr key={id}>
								<td
									className={`${styles.cell} ${styles.fixedColumn}`}
								>
									{name}
								</td>
								{dateRange.map(({ date }, columnIndex) => (
									<td
										key={columnIndex}
										className={`${styles.cell} ${
											date >= parse(start) &&
											date <= parse(end)
												? styles.highlightedCell
												: ''
										}`}
									/>
								))}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default RoadmapChart
