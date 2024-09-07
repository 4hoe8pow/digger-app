import { eq, sql } from 'drizzle-orm/sql'
import { integer, text, sqliteView, sqliteTable } from 'drizzle-orm/sqlite-core'

// Project テーブルのスキーマ
export const projects = sqliteTable('projects', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	status: text('status', {
		enum: ['planned', 'in_progress', 'completed'],
	}).default('planned'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
})

// Ticket テーブルのスキーマ
export const tickets = sqliteTable('tickets', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	description: text('description'),
	projectId: integer('project_id')
		.references(() => projects.id)
		.notNull(),
	status: text('status', { enum: ['open', 'in_progress', 'closed'] }).default(
		'open'
	),
	priority: text('priority', { enum: ['low', 'medium', 'high'] }).default(
		'medium'
	),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
})

// Assign テーブルのスキーマ (プロジェクトとユーザーIDの紐付け)
export const assignments = sqliteTable('assignments', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	projectId: integer('project_id')
		.references(() => projects.id)
		.notNull(),
	userId: integer('user_id').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
})

// 担当チケット一覧
export const userAssignedTicketsView = sqliteView('user_assigned_tickets').as(
	(qb) =>
		qb
			.select({
				userId: assignments.userId,
				projectId: projects.id,
				projectName: projects.name,
				ticketId: tickets.id,
				ticketTitle: tickets.title,
				ticketStatus: tickets.status,
				ticketPriority: tickets.priority,
			})
			.from(assignments)
			.innerJoin(projects, eq(assignments.projectId, projects.id))
			.innerJoin(tickets, eq(projects.id, tickets.projectId))
)
