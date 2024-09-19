import { ProjectViewDTO } from '~/components/applications/dto/projectDTO'
import { ProjectInputPort } from '~/components/applications/input/ProjectIuputPort'
import { ProjectOutputPort } from '~/components/applications/output/ProjectOutputPort'
import { projectInteractor } from '~/components/applications/usecase/ProjectInteractor'
import { IProjectRepository } from '~/components/domains/project/IProjectRepository'
import { projectRepositoryImpl } from '~/components/infrastructures/repositries/projectRepositoryImpl'

import { projectPresenter } from '../presenters/projectPresenter'

type ProjectControllerProps = {
	projectInputPort: ProjectInputPort
}

export const ProjectController = ({
	projectInputPort,
}: ProjectControllerProps) => ({
	getProject: (projectId: string): Promise<ProjectViewDTO> => {
		return projectInputPort.getProjectById(projectId)
	},
})

export const createProjectController = (
	r: IProjectRepository = projectRepositoryImpl,
	o: ProjectOutputPort = projectPresenter
) => {
	const projectInputPort = projectInteractor(r, o)

	return ProjectController({ projectInputPort })
}
