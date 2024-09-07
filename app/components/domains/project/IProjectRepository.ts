import { Project } from './Project'

export type IProjectRepository = {
	findById: (id: number) => Promise<Project | null>
	save: (project: Project) => Promise<void>
	deleteById: (id: number) => Promise<void>
}
