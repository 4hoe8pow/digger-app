import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	useUser,
} from '@clerk/remix'
import { Link } from '@remix-run/react'

import { userRepositoryImpl } from '~/components/infrastructures/repositries/userRepositoryImpl'
import { createUserController } from '~/components/presentations/controllers/userController'

export default function Index() {
	const { isSignedIn, user } = useUser()
	if (!isSignedIn) {
		return null
	}
	const controller = createUserController(userRepositoryImpl)

	controller.saveMe(user)
	user.primaryEmailAddress?.toString()

	return (
		<div>
			<SignedIn>
				<Link to={'/dashboard'}>Go to Dashboard</Link>
			</SignedIn>
			<SignedOut>
				<div>
					<SignInButton />
				</div>
				<div>
					<SignUpButton />
				</div>
			</SignedOut>
		</div>
	)
}
