import { ProjectViewDTO } from '../dto/projectDTO'

export type AssignmentOutputPort = {
	presentAssignmentCreationSuccess: () => void
	presentAssignmentDeletionSuccess: () => void
	presentProjects: (username: ProjectViewDTO[]) => void
	presentError: (error: Error) => void
}
