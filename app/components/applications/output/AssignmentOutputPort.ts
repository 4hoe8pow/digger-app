import { ProjectDTO } from '../dto/projectDTO'

export type AssignmentOutputPort = {
	presentAssignmentCreationSuccess: () => void
	presentAssignmentDeletionSuccess: () => void
	presentProjects: (username: ProjectDTO[]) => void
	presentError: (error: Error) => void
}
