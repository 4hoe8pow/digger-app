import { ProjectDTO } from '~/components/applications/dto/projectDTO'
import {
	AssignmentInputPort,
	IAssignmentQueryService,
} from '~/components/applications/input/AssignmentInputPort'
import { AssignmentOutputPort } from '~/components/applications/output/AssignmentOutputPort'
import { assignmentInteractor } from '~/components/applications/usecase/AssignmentInteractor'
import { IAssignmentRepository } from '~/components/domains/assign/IAssignmentRepository'
import { assignmentQueryService } from '~/components/infrastructures/queries/AssignmentQueryService'
import { assignmentRepositoryImpl } from '~/components/infrastructures/repositries/assignmentRepositoryImpl'

import { assignmentPresenter } from '../presenters/assignmentPresenter'

type AssignmentControllerProps = {
	assignmentInputPort: AssignmentInputPort
}

export const AssignmentController = ({
	assignmentInputPort,
}: AssignmentControllerProps) => ({
	assignUserToProject: (projectId: string, userId: string) => {
		assignmentInputPort.assignUserToProject(projectId, userId)
	},

	removeUserFromProject: (projectId: string, userId: string) => {
		assignmentInputPort.removeUserFromProject(projectId, userId)
	},

	getProjectsByUserId: (userId: string): Promise<ProjectDTO[]> => {
		return assignmentInputPort.getProjectsByUserId(userId)
	},
})

export const createAssignmentController = (
	ar: IAssignmentRepository = assignmentRepositoryImpl,
	q: IAssignmentQueryService = assignmentQueryService,
	o: AssignmentOutputPort = assignmentPresenter
) => {
	const assignmentInputPort = assignmentInteractor(ar, q, o)

	return AssignmentController({ assignmentInputPort })
}
