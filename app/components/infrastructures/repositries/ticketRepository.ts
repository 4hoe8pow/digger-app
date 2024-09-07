import { eq } from 'drizzle-orm/sql'

import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import {
	Ticket,
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

import { tickets } from '../schema'

export const ticketRepository: ITicketRepository = {
	// チケットIDでチケットを検索
	findById: async (id: number): Promise<Ticket | null> => {
		const result = await db
			.select()
			.from(tickets)
			.where(eq(tickets.id, id))
			.limit(1)
			.execute()

		if (result.length === 0) {
			return null
		}

		const row = result[0]
		return {
			id: row.id,
			createdAt: new Date(row.created_at * 1000), // Unix timestamp から Date へ変換
			updatedAt: new Date(row.updated_at * 1000), // Unix timestamp から Date へ変換
			title: row.title,
			description: row.description,
			projectId: row.project_id,
			status: row.status as TicketStatus,
			priority: row.priority as TicketPriority,
			changeTitle: (newTitle: string) => {
				return {
					...row,
					title: newTitle,
					updatedAt: new Date(),
				}
			},
			changeStatus: (newStatus: TicketStatus) => {
				return {
					...row,
					status: newStatus,
					updatedAt: new Date(),
				}
			},
			changePriority: (newPriority: TicketPriority) => {
				return {
					...row,
					priority: newPriority,
					updatedAt: new Date(),
				}
			},
			updateTimestamp: () => {
				return {
					...row,
					updatedAt: new Date(),
				}
			},
		}
	},

	// プロジェクトIDでチケットを検索
	findByProjectId: async (projectId: number): Promise<Ticket[]> => {
		const results = await db
			.select()
			.from(tickets)
			.where(eq(tickets.projectId, projectId))
			.execute()

		return results.map((row) => ({
			id: row.id,
			createdAt: new Date(row.created_at * 1000),
			updatedAt: new Date(row.updated_at * 1000),
			title: row.title,
			description: row.description,
			projectId: row.project_id,
			status: row.status as TicketStatus,
			priority: row.priority as TicketPriority,
			changeTitle: (newTitle: string) => {
				return {
					...row,
					title: newTitle,
					updatedAt: new Date(),
				}
			},
			changeStatus: (newStatus: TicketStatus) => {
				return {
					...row,
					status: newStatus,
					updatedAt: new Date(),
				}
			},
			changePriority: (newPriority: TicketPriority) => {
				return {
					...row,
					priority: newPriority,
					updatedAt: new Date(),
				}
			},
			updateTimestamp: () => {
				return {
					...row,
					updatedAt: new Date(),
				}
			},
		}))
	},

	// チケットを保存
	save: async (ticket: Ticket): Promise<void> => {
		await db
			.insert(tickets)
			.values({
				id: ticket.id,
				created_at: Math.floor(ticket.createdAt.getTime() / 1000), // Date から Unix timestamp へ変換
				updated_at: Math.floor(ticket.updatedAt.getTime() / 1000), // Date から Unix timestamp へ変換
				title: ticket.title,
				description: ticket.description,
				project_id: ticket.projectId,
				status: ticket.status,
				priority: ticket.priority,
			})
			.onConflictDoUpdate({
				target: ['id'],
				set: {
					updated_at: Math.floor(ticket.updatedAt.getTime() / 1000),
					title: ticket.title,
					description: ticket.description,
					status: ticket.status,
					priority: ticket.priority,
				},
			})
			.execute()
	},

	// チケットをIDで削除
	deleteById: async (id: number): Promise<void> => {
		await db.delete(tickets).where(eq(tickets.id, id)).execute()
	},
}
