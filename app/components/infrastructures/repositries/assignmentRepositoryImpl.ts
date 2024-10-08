import { Assignment } from '~/components/domains/assign/Assignment'
import { IAssignmentRepository } from '~/components/domains/assign/IAssignmentRepository'

import { db } from '../db'
import { Database } from '../schema'

type AssignmentType = Database['public']['Tables']['assignments']['Row']

// アサインメントエンティティを生成するヘルパー関数
const createAssignmentEntity = (row: AssignmentType): Assignment => ({
	projectId: row.project_id,
	username: row.username,
})

export const assignmentRepositoryImpl: IAssignmentRepository = {
	// プロジェクトIDでアサインメントを検索
	findByProjectId: async (projectId: string): Promise<Assignment[]> => {
		const { data, error } = await db
			.from('assignments')
			.select('*')
			.eq('project_id', projectId)

		if (error) {
			return []
		}

		return data.map(createAssignmentEntity)
	},

	// アサインメントを保存
	save: async (assignment: Assignment): Promise<void> => {
		await db
			.from('assignments')
			.upsert({
				project_id: assignment.projectId,
				username: assignment.username,
			})
			.single()
	},

	// プロジェクトIDとユーザーIDでアサインメントを削除
	deleteByProjectIdAndUserId: async (
		projectId: string,
		username: string
	): Promise<void> => {
		await db
			.from('assignments')
			.delete()
			.eq('project_id', projectId)
			.eq('user_id', username)
	},
}
