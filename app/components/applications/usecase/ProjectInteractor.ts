import { IProjectRepository } from '~/components/domains/project/IProjectRepository'
import { Project, ProjectStatus } from '~/components/domains/project/Project'

import { ProjectInputPort } from '../input/ProjectIuputPort'
import { ProjectOutputPort } from '../output/ProjectOutputPort'

export const projectInteractor = (
	projectRepository: IProjectRepository,
	outputPort: ProjectOutputPort
): ProjectInputPort => ({
	async createProject(name, description, status) {
		const project: Project = {
			name,
			description,
			status,
			changeName: () => project,
			changeStatus: () => project,
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
		id: number,
		name?: string,
		description?: string | null,
		status?: ProjectStatus
	): Promise<void> {
		projectRepository
			.findById(id)
			.then((project) => {
				if (!project) throw new Error('Project not found')

				if (name) project.changeName(name)
				if (description !== undefined) project.description = description
				if (status) project.changeStatus(status)

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

	async deleteProject(id: number): Promise<void> {
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

	async getProjectById(id: number): Promise<void> {
		projectRepository
			.findById(id)
			.then((project) => {
				if (!project) throw new Error('Project not found')
				outputPort.presentProject(project)
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},
})
