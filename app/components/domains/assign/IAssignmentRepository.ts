import { Assignment } from './Assignment'

export type IAssignmentRepository = {
	findById: (id: number) => Promise<Assignment | null>
	findByProjectId: (projectId: number) => Promise<Assignment[]>
	findByUserId: (userId: number) => Promise<Assignment[]>
	save: (assignment: Assignment) => Promise<void>
	deleteById: (id: number) => Promise<void>
}
