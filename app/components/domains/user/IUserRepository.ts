import { User } from './User'

export type IUserRepository = {
	_currentUser: User
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	saveMe(user: any): void
}
