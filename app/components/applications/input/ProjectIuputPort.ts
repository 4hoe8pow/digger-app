import { ProjectStatus } from '~/components/domains/project/Project'

export type ProjectInputPort = {
	createProject: (
		name: string,
		description: string | null,
		status: ProjectStatus
	) => Promise<void>
	updateProject: (
		id: number,
		name?: string,
		description?: string | null,
		status?: ProjectStatus
	) => Promise<void>
	deleteProject: (id: number) => Promise<void>
	getProjectById: (id: number) => Promise<void>
}
