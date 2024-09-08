import { ProjectStatus } from '~/components/domains/project/Project'

export type ProjectDTO = {
	id: number
	name: string
	description: string | null
	status: ProjectStatus
}
