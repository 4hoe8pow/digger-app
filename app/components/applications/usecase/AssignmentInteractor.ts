import { Assignment } from '~/components/domains/assign/Assignment'
import { IAssignmentRepository } from '~/components/domains/assign/IAssignmentRepository'

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
	async assignUserToProject(projectId: number, userId: number) {
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

	async removeUserFromProject(projectId: number, userId: number) {
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

	async getProjectsByUserId(userId: number) {
		assignmentQueryService
			.getProjectsByUserId(userId)
			.then((projects) => {
				outputPort.presentProjects(projects)
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
