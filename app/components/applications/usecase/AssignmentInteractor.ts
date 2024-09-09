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
	async assignUserToProject(projectId: string, userId: string) {
		const assignment: Assignment = {
			projectId,
			userId,
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

	async removeUserFromProject(projectId: string, userId: string) {
		assignmentRepository
			.deleteByProjectIdAndUserId(projectId, userId)
			.then(() => outputPort.presentAssignmentDeletionSuccess())
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error('An unknown error occurred')
				outputPort.presentError(typedError)
			})
	},

	async getProjectsByUserId(userId: string): Promise<ProjectDTO[]> {
		return assignmentQueryService
			.getProjectsByUserId(userId)
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
