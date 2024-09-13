import { ClerkApp } from '@clerk/remix'
import { LinksFunction } from '@remix-run/cloudflare'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import { DiggerHeader } from './components/presentations/views/panels/DiggerHeader'
import styles from './index.css?url'

import '98.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export function App() {
	return (
		<>
			<DiggerHeader />
			<Outlet />
		</>
	)
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default ClerkApp(App, {
	publishableKey: PUBLISHABLE_KEY,
	signInFallbackRedirectUrl: '/dashboard',
	signUpFallbackRedirectUrl: '/',
})

export function HydrateFallback() {
	return <p>Loading...</p>
}
