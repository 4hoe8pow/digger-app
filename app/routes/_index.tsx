import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/remix'
import { Link, useLoaderData } from '@remix-run/react'

import { ticketRepository } from '~/components/infrastructures/repositries/ticketRepository'

export async function clientLoader() {
	const data = await ticketRepository.findById(1)

	return data
}

export default function Index() {
	const data = useLoaderData<typeof clientLoader>()


	return (
		<div>
			<div>
					<h2>Ticket Data</h2>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
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
