import { IUserRepository } from '~/components/domains/user/IUserRepository'

import { db } from '../db'

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

	getUserId: async (username: string): Promise<string | null> => {
		const { data, error } = await db
			.from('users')
			.select('id')
			.eq('username', username)
			.single()

		if (error || !data) {
			return null
		}

		return data.id
	},
}
