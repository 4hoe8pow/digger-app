import { parse } from '@formkit/tempo'

import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import {
	Ticket,
	TicketStatus,
	TicketPriority,
	fromNumberToTicketDifficulty,
	fromTicketDifficultyToNumber,
	fromTicketPriorityToString,
	fromTicketStatusToString,
} from '~/components/domains/ticket/Ticket'

import { db } from '../db'

// チケットエンティティを生成するヘルパー関数

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTicketEntity = (row: any): Ticket => ({
	id: row.id,
	createdAt: parse(row.created_at!),
	updatedAt: parse(row.updated_at!),
	title: row.title,
	description: row.description,
	username: row.users?.clerk_username || '',
	difficulty: fromNumberToTicketDifficulty(row.effort_estimate),
	startedAt: parse(row.started_at!),
	completedAt: parse(row.completed_at!),
	status: row.status as TicketStatus,
	priority: row.priority as TicketPriority,
	projectId: row.project_id,
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
	save: async (ticket: Ticket): Promise<void | null> => {
		const { data: userData, error } = await db
			.from('users')
			.select('id')
			.eq('clerk_username', ticket.username)
			.single()

		if (error || !userData) {
			return null
		}

		console.log('target', ticket)

		const { data: upsertData, error: upsertError } = await db
			.from('tickets')
			.upsert(
				{
					id: ticket.id === '' ? undefined : ticket.id,
					title: ticket.title,
					description: ticket.description,
					user_id: userData.id,
					effort_estimate: fromTicketDifficultyToNumber(
						ticket.difficulty
					),
					status: fromTicketStatusToString(ticket.status),
					priority: fromTicketPriorityToString(ticket.priority),
					project_id: ticket.projectId,
					started_at: ticket.startedAt
						? ticket.startedAt.toISOString()
						: null,
					completed_at: ticket.completedAt
						? ticket.completedAt.toISOString()
						: null,
				},
				{ onConflict: 'id' }
			)
			.select()
		console.log('upsertData', upsertData)
		console.log('upsertError', upsertError)
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
		if (error || !data) {
			return []
		}

		return data.map(createTicketEntity)
	},
}
