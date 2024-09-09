import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	useUser,
} from '@clerk/remix'
import { Link } from '@remix-run/react'

import { userController } from '~/entry.client'

export default function Index() {
	const { isSignedIn, user } = useUser()
	if (!isSignedIn) {
		return null
	}

	userController.saveMe(user)

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
