import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from './env.config.js';
import * as schema from '../schemas/index.js';

// Initializes a Neon database connection using the provided DATABASE_URL.
const sql = neon(env.DATABASE_URL!);

// Creates a Drizzle ORM instance with the Neon client and database schema.
const db = drizzle({ client: sql, schema: schema });

export { sql, db };