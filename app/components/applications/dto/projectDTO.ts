import { Project } from '~/components/domains/project/Project'

export type ProjectViewDTO = {
	id: string
	name: string
	description: string | null
	is_active: boolean
}

export const fromProjectToProjectViewDTO = (
	project: Project
): ProjectViewDTO => ({
	id: project.id,
	name: project.name,
	description: project.description,
	is_active: project.is_active,
})
