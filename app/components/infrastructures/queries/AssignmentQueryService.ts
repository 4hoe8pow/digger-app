import { ProjectDTO } from '~/components/applications/dto/projectDTO'
import { IAssignmentQueryService } from '~/components/applications/input/AssignmentInputPort'
import { db } from '~/components/infrastructures/db'

export const AssignmentQueryService: IAssignmentQueryService = {
	async getProjectsByUserId(userId: number): Promise<ProjectDTO[]> {
		return Promise.resolve(
			db
				.from('assignments')
				.select(
					`
          projects (
            id,
            name,
            description,
            status
          )
        `
				)
				.eq('user_id', userId)
		)
			.then(({ data, error }) => {
				if (error) {
					throw new Error(
						'Failed to fetch projects for user: ' + error.message
					)
				}

				if (!data || data.length === 0) {
					return []
				}

				const projectDTOs: ProjectDTO[] = data.map(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(assignment: any) => ({
						id: assignment.projects.id,
						name: assignment.projects.name,
						description: assignment.projects.description,
						status: assignment.projects.status,
					})
				)

				return projectDTOs
			})
			.catch((error: unknown) => {
				const typedError =
					error instanceof Error
						? error
						: new Error(
								'An unknown error occurred while fetching projects for user'
							)
				throw typedError
			})
	},
}
