import { useMemo } from 'react'

import { diffDays, format, parse } from '@formkit/tempo'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { mean, standardDeviation } from 'simple-statistics'

import { css } from 'styled-system/css'

// Register chart elements
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

type TicketDTO = {
	id: string
	username: string
	start: string
	end: string
	status: string
}

type MetricsTableProps = {
	metrics: Array<{
		username: string
		averageDailyTickets: number
		turnoverRate: number
		turnoverRateZScore: number
		delayRate: number
		totalClosed: number
	}>
	styles: {
		table: string
		th: string
		td: string
	}
}

interface BurndownChartProps {
	tickets: TicketDTO[]
}

// Helper Functions
const getDateRange = (tickets: TicketDTO[]) =>
	tickets.reduce(
		({ min, max }, { start, end }) => ({
			min: Math.min(min, parse(start).getTime()),
			max: Math.max(max, parse(end).getTime()),
		}),
		{ min: Infinity, max: -Infinity }
	)

const generateDateRange = (startDate: Date, endDate: Date) =>
	Array.from(
		{ length: diffDays(endDate, startDate) + 1 },
		(_, i) => new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
	)

const calculateMetrics = (tickets: TicketDTO[], dateRange: Date[]) => {
	const dailyTicketCounts = dateRange.map(
		(date) =>
			tickets.filter(
				(ticket) =>
					parse(ticket.start) <= date && parse(ticket.end) >= date
			).length
	)
	const averageDailyTickets =
		dailyTicketCounts.length > 0 ? mean(dailyTicketCounts) : 0

	const openDays = tickets.map((ticket) =>
		diffDays(parse(ticket.end), parse(ticket.start))
	)
	const averageResponseTime =
		tickets.length > 0
			? openDays.reduce((acc, days) => acc + days, 0) / tickets.length
			: 0

	const today = new Date()
	const openTickets = tickets.filter(
		(ticket) => ticket.status === 'pending' || ticket.status === 'active'
	)

	const delayedTickets = openTickets.filter(
		(ticket) => parse(ticket.end) < today
	)

	const turnoverRate = openDays.length > 0 ? mean(openDays) : 0
	const delayRate =
		openTickets.length > 0 ? delayedTickets.length / openTickets.length : 0
	const totalClosed = tickets.length - openTickets.length

	return {
		averageDailyTickets,
		averageResponseTime,
		turnoverRate,
		delayRate,
		totalClosed,
	}
}

const calculateZScore = (value: number, mean: number, stdDev: number) =>
	((mean - value) / stdDev) * 10 + 50

// Components
const MetricsTable = ({ metrics, styles }: MetricsTableProps) => (
	<table className={styles.table}>
		<thead>
			<tr>
				<th className={styles.th}>User</th>
				<th className={styles.th}>Average Tickets Held</th>
				<th className={styles.th}>Total Closed</th>
				<th className={styles.th}>Turnover Rate</th>
				<th className={styles.th}>Turnover Rate Z-Score</th>
				<th className={styles.th}>Delay Rate</th>
			</tr>
		</thead>
		<tbody>
			{metrics.map(
				({
					username,
					averageDailyTickets,
					turnoverRate,
					turnoverRateZScore,
					delayRate,
					totalClosed,
				}) => (
					<tr key={username}>
						<td className={styles.td}>{username}</td>
						<td className={styles.td}>
							{averageDailyTickets.toFixed(1)}
						</td>
						<td className={styles.td}>{totalClosed}</td>
						<td className={styles.td}>{turnoverRate.toFixed(1)}</td>
						<td className={styles.td}>
							{turnoverRateZScore.toFixed(1)}
						</td>
						<td className={styles.td}>
							{(delayRate * 100).toFixed(1)}&nbsp;%
						</td>
					</tr>
				)
			)}
		</tbody>
	</table>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Chart = ({ data, options }: { data: any; options: any }) => (
	<div className={css({ overflowX: 'auto', maxW: '100%' })}>
		<Line data={data} options={options} />
	</div>
)

const BurndownChart = ({ tickets }: BurndownChartProps) => {
	const styles = {
		container: css({ overflowX: 'auto', maxW: '100%' }),
		table: css({
			marginTop: '1rem',
			w: '100%',
			borderCollapse: 'collapse',
			tableLayout: 'auto',
		}),
		th: css({ border: '1px solid #ddd', p: '8px', textAlign: 'left' }),
		td: css({ border: '1px solid #ddd', p: '8px', textAlign: 'right' }),
	}

	const { min: startDate, max: endDate } = getDateRange(tickets)
	const dateRange = useMemo(
		() => generateDateRange(new Date(startDate), new Date(endDate)),
		[startDate, endDate]
	)

	const datasets = useMemo(
		() =>
			Object.entries(
				tickets.reduce(
					(acc, ticket) => {
						if (
							ticket.status === 'pending' ||
							ticket.status === 'active'
						) {
							acc[ticket.username] = acc[ticket.username] || []
							acc[ticket.username].push(ticket)
						}
						return acc
					},
					{} as Record<string, TicketDTO[]>
				)
			).map(([username, userTickets]) => ({
				label: username,
				data: dateRange.map(
					(date) =>
						userTickets.filter(
							(ticket) =>
								parse(ticket.start) <= date &&
								parse(ticket.end) >= date
						).length
				),
				borderColor: `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${
					Math.random() * 256
				})`,
			})),
		[tickets, dateRange]
	)

	const chartData = useMemo(
		() => ({
			labels: dateRange.map((date) => format(date, 'M/D')),
			datasets,
		}),
		[dateRange, datasets]
	)

	const options = useMemo(
		() => ({
			scales: {
				y: { beginAtZero: true, ticks: { stepSize: 1 } },
			},
		}),
		[]
	)

	const userMetrics = useMemo(() => {
		const metrics = Object.entries(
			tickets.reduce(
				(acc, ticket) => {
					acc[ticket.username] = acc[ticket.username] || []
					acc[ticket.username].push(ticket)
					return acc
				},
				{} as Record<string, TicketDTO[]>
			)
		).map(([username, userTickets]) => {
			const {
				averageDailyTickets,
				averageResponseTime,
				turnoverRate,
				delayRate,
				totalClosed,
			} = calculateMetrics(userTickets, dateRange)

			return {
				username,
				averageDailyTickets,
				averageResponseTime,
				turnoverRate,
				delayRate,
				totalClosed,
			}
		})

		const turnoverRates = metrics.map((metric) => metric.turnoverRate)
		const meanTurnoverRate =
			turnoverRates.length > 0 ? mean(turnoverRates) : 0
		const stdDevTurnoverRate =
			turnoverRates.length > 0 ? standardDeviation(turnoverRates) : 0

		const averageResponseTimes = metrics.map(
			(metric) => metric.averageResponseTime
		)
		const meanResponseTime =
			averageResponseTimes.length > 0 ? mean(averageResponseTimes) : 0
		const stdDevResponseTime =
			averageResponseTimes.length > 0
				? standardDeviation(averageResponseTimes)
				: 0

		return metrics
			.map((metric) => ({
				...metric,
				turnoverRateZScore: calculateZScore(
					metric.turnoverRate,
					meanTurnoverRate,
					stdDevTurnoverRate
				),
				responseTimeZScore: calculateZScore(
					metric.averageResponseTime,
					meanResponseTime,
					stdDevResponseTime
				),
			}))
			.sort((a, b) => b.turnoverRateZScore - a.turnoverRateZScore)
	}, [tickets, dateRange])

	return (
		<div>
			<Chart data={chartData} options={options} />
			<MetricsTable metrics={userMetrics} styles={styles} />
		</div>
	)
}

export default BurndownChart
