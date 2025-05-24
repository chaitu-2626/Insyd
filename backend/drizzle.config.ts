import { defineConfig } from 'drizzle-kit';
import { env } from './src/config/env';

// Defines the Drizzle ORM configuration for migrations and schema.
export default defineConfig({
	out: './src/migration',
	schema: './src/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL!,
	},
});
