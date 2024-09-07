import { MemberData } from '~/routes/dashboard.overview'

export const defaultMemberData: MemberData[] = [
	{ name: 'Alice', open: 3, resolved: 31, joined: '2021/9/21' },
	{ name: 'Bob', open: 5, resolved: 22, joined: '2022/1/15' },
	{ name: 'Charlie', open: 2, resolved: 18, joined: '2023/4/30' },
	{ name: 'David', open: 7, resolved: 27, joined: '2022/11/01' },
	{ name: 'Eva', open: 4, resolved: 29, joined: '2021/8/19' },
	{ name: 'Frank', open: 6, resolved: 21, joined: '2020/12/05' },
	{ name: 'Grace', open: 3, resolved: 19, joined: '2022/3/14' },
	{ name: 'Hannah', open: 8, resolved: 30, joined: '2021/7/22' },
	{ name: 'Ivy', open: 5, resolved: 25, joined: '2023/1/12' },
	{ name: 'Jack', open: 7, resolved: 28, joined: '2020/11/30' },
	{ name: 'Katherine', open: 4, resolved: 26, joined: '2021/9/11' },
	{ name: 'Liam', open: 6, resolved: 20, joined: '2022/5/09' },
	{ name: 'Mia', open: 3, resolved: 32, joined: '2021/6/14' },
	{ name: 'Noah', open: 8, resolved: 24, joined: '2023/3/28' },
	{ name: 'Olivia', open: 5, resolved: 23, joined: '2022/2/19' },
]

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

export const defaultProjectData = { title: 'Content' }

export const chartData = [
	{ x: 'January', y: 30 },
	{ x: 'February', y: 20 },
	{ x: 'March', y: 50 },
	{ x: 'April', y: 40 },
	{ x: 'May', y: 70 },
]
