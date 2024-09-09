export type Project = {
	name: string
	description: string | null
	is_active: boolean
	changeName: (newName: string) => Project
	changeStatus: (newStatus: boolean) => Project
}
