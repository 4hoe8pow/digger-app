import { SignedIn, SignedOut } from '@clerk/remix'
import { Link } from '@remix-run/react'

export default function Index() {
	return (
		<div>
			<SignedIn>
				<Link to={'/dashboard'}>Go to Dashboard</Link>
			</SignedIn>
			<SignedOut>Something wrong</SignedOut>
		</div>
	)
}
