import { Assignment } from '~/components/domains/assign/Assignment'
import { IAssignmentRepository } from '~/components/domains/assign/IAssignmentRepository'

import { ProjectDTO } from '../dto/projectDTO'
import {
	AssignmentInputPort,
	IAssignmentQueryService,
} from '../input/AssignmentInputPort'
import { AssignmentOutputPort } from '../output/AssignmentOutputPort'

export const assignmentInteractor = (
	assignmentRepository: IAssignmentRepository,
	assignmentQueryService: IAssignmentQueryService,
	outputPort: AssignmentOutputPort
): AssignmentInputPort => ({
	async assignUserToProject(projectId: string, username: string) {
		const assignment: Assignment = {
			projectId,
			username,
		}
		assignmentRepository
			.save(assignment)
			.then(() => outputPort.presentAssignmentCreationSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async removeUserFromProject(projectId: string, username: string) {
		assignmentRepository
			.deleteByProjectIdAndUserId(projectId, username)
			.then(() => outputPort.presentAssignmentDeletionSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async getProjectsByUsername(username: string): Promise<ProjectDTO[]> {
		return assignmentQueryService
			.getProjectsByUsername(username)
			.then((projects) => {
				outputPort.presentProjects(projects)
				return projects
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error(
								'An unknown error occurred while fetching projects'
							)
				outputPort.presentError(typedError)
				return Promise.reject(typedError)
			})
	},
})
