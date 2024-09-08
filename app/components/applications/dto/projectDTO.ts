import { ProjectStatus } from '~/components/domains/project/Project'

export type ProjectDTO = {
	id: string
	name: string
	description: string | null
	status: ProjectStatus
}
