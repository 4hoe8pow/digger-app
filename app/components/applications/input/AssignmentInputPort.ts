import { ProjectDTO } from '../dto/projectDTO'

export type AssignmentInputPort = {
	//ユーザをプロジェクトへアサイン
	assignUserToProject: (projectId: string, userId: string) => Promise<void>
	//ユーザをプロジェクトから除外
	removeUserFromProject: (projectId: string, userId: string) => Promise<void>
	getProjectsByMe: () => Promise<ProjectDTO[]>
}

export type IAssignmentQueryService = {
	getProjectsByUser: (userId: string) => Promise<ProjectDTO[]>
}
