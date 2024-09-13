import { Assignment } from './Assignment'

export type IAssignmentRepository = {
	findByProjectId: (projectId: string) => Promise<Assignment[]>
	save: (assignment: Assignment) => Promise<void>
	deleteByProjectIdAndUserId: (
		projectId: string,
		username: string
	) => Promise<void>
}
