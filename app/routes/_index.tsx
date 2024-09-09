import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/remix'
import { Link } from '@remix-run/react'

export default function Index() {
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
