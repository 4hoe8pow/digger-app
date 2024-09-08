import { ProjectDTO } from '../dto/projectDTO'

export type AssignmentInputPort = {
	//ユーザをプロジェクトへアサイン
	assignUserToProject: (projectId: number, userId: number) => Promise<void>
	//ユーザをプロジェクトから除外
	removeUserFromProject: (projectId: number, userId: number) => Promise<void>
	getProjectsByUserId: (userId: number) => Promise<void>
}

export type IAssignmentQueryService = {
	getProjectsByUserId: (userId: number) => Promise<ProjectDTO[]>
}
