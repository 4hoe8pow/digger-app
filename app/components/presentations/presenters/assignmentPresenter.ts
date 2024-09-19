import { ProjectViewDTO } from '~/components/applications/dto/projectDTO'
import { AssignmentOutputPort } from '~/components/applications/output/AssignmentOutputPort'

/* eslint-disable no-console */
export const assignmentPresenter: AssignmentOutputPort = {
	presentAssignmentCreationSuccess: () => {
		console.log('Assignment creation succeeded.')
	},

	presentAssignmentDeletionSuccess: () => {
		console.log('Assignment deletion succeeded.')
	},

	presentProjects: (username: ProjectViewDTO[]) => {
		console.log('Projects:', username)
	},

	presentError: (error: Error) => {
		console.error('An error occurred:', error.message)
	},
}
