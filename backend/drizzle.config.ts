import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

// Defines the Drizzle ORM configuration for migrations and schema.
export default defineConfig({
	out: './src/migrations',
	schema: './dist/schemas/index.js',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
