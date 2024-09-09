import { Project } from './Project'

export type IProjectRepository = {
	findById: (id: string) => Promise<Project | null>
	save: (project: Project) => Promise<void>
	deleteById: (id: string) => Promise<void>
}
