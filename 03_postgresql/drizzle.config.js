import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { db } from './db.js';
import { drizzle } from 'drizzle-orm/neon-http';
import schema from './schema.js';


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the .env file');
}

export default defineConfig({
  schema: schema, // Your schema file path
  out: './drizzle', // Your migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

// ✅ Correct - single declaration
export const db = drizzle(sql);