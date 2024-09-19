import { ProjectViewDTO } from '~/components/applications/dto/projectDTO'
import { IAssignmentQueryService } from '~/components/applications/input/AssignmentInputPort'
import { db } from '~/components/infrastructures/db'

export const assignmentQueryService: IAssignmentQueryService = {
	async getProjectsByUsername(username: string): Promise<ProjectViewDTO[]> {
		return Promise.resolve(
			db
				.from('assignments')
				.select(
					`
					projects!inner (
						id,
            			name,
            			description,
            			is_active
          			),
					users!inner (
						id,
						clerk_username
					)
        			`
				)
				.eq('users.clerk_username', username)
		).then(({ data, error }) => {
			if (error) {
				throw new Error(error.message)
			}

			if (!data || data.length === 0) {
				return []
			}

			console.log('DATA', data)

			const projectDTOs: ProjectViewDTO[] = data.map(
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
