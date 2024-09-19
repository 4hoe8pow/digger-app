import { IProjectRepository } from '~/components/domains/project/IProjectRepository'
import { Project } from '~/components/domains/project/Project'

import { db } from '../db'
import { Database } from '../schema'

type ProjectType = Database['public']['Tables']['projects']['Row']

// プロジェクトエンティティを生成するヘルパー関数
const createProjectEntity = (row: ProjectType): Project => ({
	id: row.id,
	name: row.name,
	description: row.description,
	is_active: row.is_active!,
})

export const projectRepositoryImpl: IProjectRepository = {
	// プロジェクトIDで検索
	findById: async (id: string): Promise<Project | null> => {
		const { data, error } = await db
			.from('projects')
			.select(
				`
				id,
				name,
				description,
				is_active
				`
			)
			.eq('id', id)
			.single()

		if (error || !data) {
			return null
		}
		return createProjectEntity(data as ProjectType)
	},

	// プロジェクトを保存
	save: async (project: Project): Promise<void> => {
		await db
			.from('projects')
			.upsert({
				name: project.name,
				description: project.description,
				is_active: project.is_active,
			})
			.single()
	},

	// プロジェクトをIDで削除
	deleteById: async (id: string): Promise<void> => {
		await db.from('projects').delete().eq('id', id)
	},
}
