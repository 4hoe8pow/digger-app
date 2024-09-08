import { IProjectRepository } from '~/components/domains/project/IProjectRepository'
import { Project, ProjectStatus } from '~/components/domains/project/Project'

import { db } from '../db'
import { Database } from '../schema'

type ProjectType = Database['public']['Tables']['projects']['Row']

// プロジェクトエンティティを生成するヘルパー関数
const createProjectEntity = (row: ProjectType): Project => ({
	name: row.name,
	description: row.description,
	status: row.status as ProjectStatus,
	changeName(newName: string): Project {
		return { ...this, name: newName }
	},
	changeStatus(newStatus: ProjectStatus): Project {
		return { ...this, status: newStatus }
	},
})

export const projectRepositoryImpl: IProjectRepository = {
	// プロジェクトIDで検索
	findById: async (id: number): Promise<Project | null> => {
		const { data, error } = await db
			.from('projects')
			.select('*')
			.eq('id', id)
			.single()

		if (error || !data) {
			return null
		}

		return createProjectEntity(data)
	},

	// プロジェクトを保存
	save: async (project: Project): Promise<void> => {
		await db
			.from('projects')
			.upsert({
				name: project.name,
				description: project.description,
				status: project.status,
			})
			.single()
	},

	// プロジェクトをIDで削除
	deleteById: async (id: number): Promise<void> => {
		await db.from('projects').delete().eq('id', id)
	},
}
