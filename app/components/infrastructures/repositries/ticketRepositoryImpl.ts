import { parse } from '@formkit/tempo'

import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import {
	Ticket,
	TicketStatus,
	TicketPriority,
} from '~/components/domains/ticket/Ticket'

import { db } from '../db'
import { Database } from '../schema'

type TicketType = Database['public']['Tables']['tickets']['Row']

// チケットエンティティを生成するヘルパー関数
const createTicketEntity = (row: TicketType): Ticket => ({
	id: row.id,
	createdAt: parse(row.created_at!),
	updatedAt: parse(row.updated_at!),
	title: row.title,
	description: row.description,
	projectId: row.project_id,
	status: row.status as TicketStatus,
	priority: row.priority as TicketPriority,
	changeTitle(newTitle: string): Ticket {
		return { ...this, title: newTitle, updatedAt: new Date() }
	},
	changeStatus(newStatus: TicketStatus): Ticket {
		return { ...this, status: newStatus, updatedAt: new Date() }
	},
	changePriority(newPriority: TicketPriority): Ticket {
		return { ...this, priority: newPriority, updatedAt: new Date() }
	},
})

export const ticketRepositoryImpl: ITicketRepository = {
	// チケットIDでチケットを検索
	findById: async (id: number): Promise<Ticket | null> => {
		const { data, error } = await db
			.from('tickets')
			.select('*')
			.eq('id', id)
			.single()

		if (error || !data) {
			return null
		}

		return createTicketEntity(data)
	},

	// プロジェクトIDでチケットを検索
	findByProjectId: async (projectId: number): Promise<Ticket[]> => {
		const { data, error } = await db
			.from('tickets')
			.select('*')
			.eq('project_id', projectId)

		if (error) {
			return []
		}

		return data.map(createTicketEntity)
	},

	// チケットを保存
	save: async (ticket: Ticket): Promise<void> => {
		await db
			.from('tickets')
			.upsert({
				id: ticket.id,
				created_at: ticket.createdAt.toISOString(),
				updated_at: ticket.updatedAt.toISOString(),
				title: ticket.title,
				description: ticket.description,
				project_id: ticket.projectId,
				status: ticket.status,
				priority: ticket.priority,
			})
			.single()
	},

	// チケットをIDで削除
	deleteById: async (id: number): Promise<void> => {
		await db.from('tickets').delete().eq('id', id)
	},
}
