import { defineConfig } from 'drizzle-kit';
import { env } from './src/configs';

// Defines the Drizzle ORM configuration for migrations and schema.
export default defineConfig({
	out: './src/migrations',
	schema: './src/schemas/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL as string,
	},
});
