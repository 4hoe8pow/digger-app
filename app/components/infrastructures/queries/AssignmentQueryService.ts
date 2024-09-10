import { ProjectDTO } from '~/components/applications/dto/projectDTO'
import { IAssignmentQueryService } from '~/components/applications/input/AssignmentInputPort'
import { db } from '~/components/infrastructures/db'

export const assignmentQueryService: IAssignmentQueryService = {
	async getProjectsByUsername(username: string): Promise<ProjectDTO[]> {
		return Promise.resolve(
			db
				.from('assignments')
				.select(
					`
					projects (
						id,
            			name,
            			description,
            			is_active
          			)
        		`
				)
				.eq('username', username)
		).then(({ data, error }) => {
			if (error) {
				throw new Error(error.message)
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
					is_active: assignment.projects.is_active,
				})
			)
			return projectDTOs
		})
	},
}
