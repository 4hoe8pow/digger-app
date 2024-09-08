import { ProjectDTO } from '~/components/applications/dto/projectDTO'
import {
	AssignmentInputPort,
	IAssignmentQueryService,
} from '~/components/applications/input/AssignmentInputPort'
import { AssignmentOutputPort } from '~/components/applications/output/AssignmentOutputPort'
import { assignmentInteractor } from '~/components/applications/usecase/AssignmentInteractor'
import { IAssignmentRepository } from '~/components/domains/assign/IAssignmentRepository'
import { IUserRepository } from '~/components/domains/user/IUserRepository'
import { assignmentQueryService } from '~/components/infrastructures/queries/AssignmentQueryService'
import { assignmentRepositoryImpl } from '~/components/infrastructures/repositries/assignmentRepositoryImpl'
import { userRepositoryImpl } from '~/components/infrastructures/repositries/userRepositoryImpl'

import { assignmentPresenter } from '../presenters/assignmentPresenter'

type AssignmentControllerProps = {
	assignmentInputPort: AssignmentInputPort
}

export const AssignmentController = ({
	assignmentInputPort,
}: AssignmentControllerProps) => ({
	assignUserToProject: (projectId: number, userId: number) => {
		assignmentInputPort.assignUserToProject(projectId, userId)
	},

	removeUserFromProject: (projectId: number, userId: number) => {
		assignmentInputPort.removeUserFromProject(projectId, userId)
	},

	getProjectsByMe: (): Promise<ProjectDTO[]> => {
		return assignmentInputPort.getProjectsByMe()
	},
})

export const createAssignmentController = (
	ar: IAssignmentRepository = assignmentRepositoryImpl,
	ur: IUserRepository = userRepositoryImpl,
	q: IAssignmentQueryService = assignmentQueryService,
	o: AssignmentOutputPort = assignmentPresenter
) => {
	const assignmentInputPort = assignmentInteractor(ur, ar, q, o)

	return AssignmentController({ assignmentInputPort })
}
