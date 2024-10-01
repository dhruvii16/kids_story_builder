import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:Sx9PNefEGM2r@ep-delicate-river-a5ixlljn.us-east-2.aws.neon.tech/ai_kids_story_generator?sslmode=require',
  },
  verbose: true,
  strict: true,
})