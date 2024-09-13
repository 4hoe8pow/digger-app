import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/remix'
import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { grid, gridItem, stack } from 'styled-system/patterns'

const styles = {
	header: stack({
		pos: 'sticky',
		top: 0,
		p: '0.62rem',
		boxShadow: 'sm',
		textAlign: { base: 'center', sm: 'left' },
		backdropFilter: 'auto',
		backdropBlur: 'sm',
	}),
	logo: css({
		fontSize: '1.6rem',
		fontWeight: 'bold',
		w: '100%',
	}),
	menu: grid({
		columns: 12,
		hideBelow: 'sm',
		textAlign: 'center',
		divideX: '1px',
		divideStyle: 'solid',
		divideColor: 'slate.300',
		alignItems: 'center',
	}),
	icon: gridItem({
		colSpan: { base: 2, sm: 3 },
		cursor: 'pointer',
	}),
}

export const DiggerHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>Digger</div>
			<nav className={styles.menu}>
				<Link
					to={'/dashboard'}
					className={styles.icon}
					aria-label="📈Dashboard"
				>
					📈Dashboard
				</Link>
				<Link
					to={'/notifications'}
					className={styles.icon}
					aria-label="Notifications"
				>
					🔔Notifications
				</Link>
				<Link
					to={'/user-settings'}
					className={styles.icon}
					aria-label="Profile"
				>
					👤User Settings
				</Link>
				<SignedIn>
					<div className={styles.icon}>
						<UserButton />
					</div>
				</SignedIn>
				<SignedOut>
					<div className={styles.icon}>
						<SignInButton />
						<SignUpButton />
					</div>
				</SignedOut>
			</nav>
		</header>
	)
}
