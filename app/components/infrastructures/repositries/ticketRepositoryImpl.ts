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
	username: row.users.clerk_username,
	effortEstimate: row.effort_estimate!,
	startedAt: parse(row.started_at!),
	completedAt: parse(row.completed_at!),
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
	changeUserId(newUserId: string): Ticket {
		return { ...this, username: newUserId, updatedAt: new Date() }
	},
	changeEffortEstimate(newEffortEstimate: number): Ticket {
		return {
			...this,
			effortEstimate: newEffortEstimate,
			updatedAt: new Date(),
		}
	},
})

export const ticketRepositoryImpl: ITicketRepository = {
	// チケットIDでチケットを検索
	findById: async (id: string): Promise<Ticket | null> => {
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
				username: ticket.username,
				effort_estimate: ticket.effortEstimate,
				status: ticket.status,
				priority: ticket.priority,
			})
			.single()
	},

	// チケットをIDで削除
	deleteById: async (id: string): Promise<void> => {
		await db.from('tickets').delete().eq('id', id)
	},

	// プロジェクト内のアクティブチケット取得
	findActiveTickets: async (projectId: string): Promise<Ticket[]> => {
		const { data, error } = await db
			.from('tickets')
			.select(
				`
					id,
					created_at,
					updated_at,
					title,
					description,
					status,
					priority,
					effort_estimate,
					started_at,
					completed_at,
					users (
						clerk_username
					)
				`
			)
			.eq('project_id', projectId)
			.in('status', [TicketStatus.PENDING, TicketStatus.ACTIVE])

		console.info('DATA1', data)
		if (error || !data) {
			return []
		}

		return data.map(createTicketEntity)
	},

	// プロジェクト内のチケット取得
	findProjectTickets: async (projectId: string): Promise<Ticket[]> => {
		const { data, error } = await db
			.from('tickets')
			.select(
				`
					id,
					created_at,
					updated_at,
					title,
					description,
					status,
					priority,
					effort_estimate,
					started_at,
					completed_at,
					users (
						clerk_username
					)
				`
			)
			.eq('project_id', projectId)

		console.info('DATA2', data)

		if (error || !data) {
			return []
		}

		return data.map(createTicketEntity)
	},
}
