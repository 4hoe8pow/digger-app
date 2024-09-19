import { ProjectViewDTO } from '../dto/projectDTO'

export type ProjectOutputPort = {
	presentProject: (project: ProjectViewDTO) => void
	presentProjectCreationSuccess: () => void
	presentProjectUpdateSuccess: () => void
	presentProjectDeletionSuccess: () => void
	presentError: (error: Error) => void
}
