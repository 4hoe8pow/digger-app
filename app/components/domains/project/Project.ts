import { Entity } from '../types/Entity'

export enum ProjectStatus {
	PLANNED = 'planned',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
}

export type Project = Entity & {
	name: string
	description?: string
	status: ProjectStatus
	changeName: (newName: string) => Project
	changeStatus: (newStatus: ProjectStatus) => Project
}
