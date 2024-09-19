import { IUserRepository } from '~/components/domains/user/IUserRepository'

export const userRepositoryImpl: IUserRepository = {
	_currentUser: {
		id: '',
		clerk_id: '',
		clerk_username: '',
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	saveMe(user: any): void {
		this._currentUser = {
			id: user.id,
			clerk_id: user.clerk_id,
			clerk_username: user.clerk_username,
		}
	},
}
