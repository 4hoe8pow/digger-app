// app/routes/user.tsx
import { Outlet } from '@remix-run/react'

export default function UserIndex() {
	return (
		<>
			<h1>user data</h1>
			{/* Nested route content will be rendered here */}
			<Outlet />
		</>
	)
}
