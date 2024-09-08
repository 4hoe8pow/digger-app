import { Assignment } from './Assignment'

export type IAssignmentRepository = {
	findByProjectId: (projectId: number) => Promise<Assignment[]>
	findByUserId: (userId: number) => Promise<Assignment[]>
	save: (assignment: Assignment) => Promise<void>
	deleteByProjectIdAndUserId: (
		projectId: number,
		userId: number
	) => Promise<void>
}
