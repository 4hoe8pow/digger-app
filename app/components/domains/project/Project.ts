export enum ProjectStatus {
	PLANNED = 'planned',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
}

export type Project = {
	name: string
	description: string | null
	status: ProjectStatus
	changeName: (newName: string) => Project
	changeStatus: (newStatus: ProjectStatus) => Project
}
