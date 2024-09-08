import { IUserRepository } from '~/components/domains/user/IUserRepository'
import { User } from '~/components/domains/user/User'
import { userRepositoryImpl } from '~/components/infrastructures/repositries/userRepositoryImpl'

type UserControllerProps = {
	userRepository: IUserRepository
}

export const UserController = ({ userRepository }: UserControllerProps) => ({
	getMe: (): User => {
		return userRepository._currentUser
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	saveMe: (user: any): void => {
		userRepository.saveMe(user)
	},
})

export const createUserController = (
	ur: IUserRepository = userRepositoryImpl
) => {
	return UserController({ userRepository: ur })
}
