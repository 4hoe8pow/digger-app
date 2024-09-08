import { Project } from '~/components/domains/project/Project'

export type ProjectOutputPort = {
	presentProject: (project: Project) => void
	presentProjects: (projects: Project[]) => void
	presentProjectCreationSuccess: () => void
	presentProjectUpdateSuccess: () => void
	presentProjectDeletionSuccess: () => void
	presentError: (error: Error) => void
}
