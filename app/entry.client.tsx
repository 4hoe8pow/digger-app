/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { RemixBrowser } from '@remix-run/react'

import { userRepositoryImpl } from './components/infrastructures/repositries/userRepositoryImpl'
import { createAssignmentController } from './components/presentations/controllers/assignmentController'
import { createUserController } from './components/presentations/controllers/userController'

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<RemixBrowser />
		</StrictMode>
	)
})

const userRepository = userRepositoryImpl
export const userController = createUserController(userRepository)
export const assignController = createAssignmentController(
	undefined,
	userRepository,
	undefined,
	undefined
)
