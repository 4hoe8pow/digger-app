import { Entity } from '../types/Entity'

export type Assignment = Entity & {
	projectId: number
	userId: number
}
