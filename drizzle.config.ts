import type { Config } from 'drizzle-kit'

export default {
	dialect: 'sqlite',
	schema: './app/components/infrastructures/schema.ts',
	out: './app/components/infrastructures/migrations',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
		token: process.env.CLOUDFLARE_D1_TOKEN!,
	},
} satisfies Config
