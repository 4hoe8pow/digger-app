import { Assignment } from './Assignment'

export type IAssignmentRepository = {
	findByProjectId: (projectId: string) => Promise<Assignment[]>
	findByUserId: (userId: string) => Promise<Assignment[]>
	save: (assignment: Assignment) => Promise<void>
	deleteByProjectIdAndUserId: (
		projectId: string,
		userId: string
	) => Promise<void>
}
