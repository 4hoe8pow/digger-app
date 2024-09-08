import { IUserRepository } from '~/components/domains/user/IUserRepository'

export const userRepositoryImpl: IUserRepository = {
	_currentUser: {
		id: '',
		firstName: null,
		lastName: null,
		fullName: null,
		username: null,
		primaryEmailAddress: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	saveMe(user: any): void {
		this._currentUser = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			fullName: user.fullName,
			username: user.username,
			primaryEmailAddress: user.primaryEmailAddress?.toString(),
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}
	},
}
