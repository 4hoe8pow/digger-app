import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	return params
}

export default function Index() {
	const data = useLoaderData<typeof clientLoader>()
	return (
		<>
			<h1>{data.userId}ww</h1>
		</>
	)
}
