import { IProjectRepository } from '~/components/domains/project/IProjectRepository'
import { Project } from '~/components/domains/project/Project'

import { fromProjectToProjectViewDTO, ProjectViewDTO } from '../dto/projectDTO'
import { ProjectInputPort } from '../input/ProjectIuputPort'
import { ProjectOutputPort } from '../output/ProjectOutputPort'

export const projectInteractor = (
	projectRepository: IProjectRepository,
	outputPort: ProjectOutputPort
): ProjectInputPort => ({
	async createProject(name, description, is_active) {
		const project: Project = {
			id: '',
			name,
			description,
			is_active,
		}

		projectRepository
			.save(project)
			.then(() => outputPort.presentProjectCreationSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async updateProject(
		id: string,
		name?: string,
		description?: string | null,
		is_active?: boolean
	): Promise<void> {
		projectRepository
			.findById(id)
			.then((project) => {
				if (!project) throw new Error('Project not found')

				// プロパティを直接更新
				if (name) project.name = name
				if (description !== undefined) project.description = description
				if (is_active !== undefined) project.is_active = is_active

				return projectRepository.save(project)
			})
			.then(() => outputPort.presentProjectUpdateSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async deleteProject(id: string): Promise<void> {
		projectRepository
			.deleteById(id)
			.then(() => outputPort.presentProjectDeletionSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async getProjectById(id: string): Promise<ProjectViewDTO> {
		return projectRepository
			.findById(id)
			.then((project) => {
				if (!project) throw new Error('Project not found')
				const dto = fromProjectToProjectViewDTO(project)
				outputPort.presentProject(dto)
				return dto
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
				return Promise.reject(typedError)
			})
	},
})
