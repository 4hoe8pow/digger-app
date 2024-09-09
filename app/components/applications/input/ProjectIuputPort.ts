export type ProjectInputPort = {
	createProject: (
		name: string,
		description: string | null,
		is_active: boolean
	) => Promise<void>
	updateProject: (
		id: string,
		name?: string,
		description?: string | null,
		is_active?: boolean
	) => Promise<void>
	deleteProject: (id: string) => Promise<void>
	getProjectById: (id: string) => Promise<void>
}
