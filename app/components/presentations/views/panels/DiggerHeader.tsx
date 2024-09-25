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
		zIndex: '999',
	}),
	logo: css({
		fontSize: '1.6rem',
		fontWeight: 'bold',
		w: '100%',
	}),
	menu: grid({
		columns: 12,
		textAlign: 'center',
		divideX: '1px',
		divideStyle: 'solid',
		divideColor: 'slate.300',
		alignItems: 'center',
	}),
	menuText: css({
		hideBelow: 'sm',
	}),
	icon: gridItem({
		colSpan: 3,
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
					📈<span className={styles.menuText}>Dashboard</span>
				</Link>
				<Link
					to={'/notifications'}
					className={styles.icon}
					aria-label="Notifications"
				>
					🔔<span className={styles.menuText}>Notifications</span>
				</Link>
				<Link
					to={'/user-settings'}
					className={styles.icon}
					aria-label="Profile"
				>
					⚙<span className={styles.menuText}>Settings</span>
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
