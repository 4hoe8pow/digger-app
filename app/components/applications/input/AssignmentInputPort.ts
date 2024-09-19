import { ProjectViewDTO } from '../dto/projectDTO'

export type AssignmentInputPort = {
	//ユーザをプロジェクトへアサイン
	assignUserToProject: (projectId: string, username: string) => Promise<void>
	//ユーザをプロジェクトから除外
	removeUserFromProject: (
		projectId: string,
		username: string
	) => Promise<void>
	getProjectsByUsername: (username: string) => Promise<ProjectViewDTO[]>
}

export type IAssignmentQueryService = {
	getProjectsByUsername: (username: string) => Promise<ProjectViewDTO[]>
}
