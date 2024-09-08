import { ProjectDTO } from '../dto/projectDTO'

export type AssignmentInputPort = {
	//ユーザをプロジェクトへアサイン
	assignUserToProject: (projectId: number, userId: number) => Promise<void>
	//ユーザをプロジェクトから除外
	removeUserFromProject: (projectId: number, userId: number) => Promise<void>
	getProjectsByMe: () => Promise<ProjectDTO[]>
}

export type IAssignmentQueryService = {
	getProjectsByUser: (userId: string) => Promise<ProjectDTO[]>
}
