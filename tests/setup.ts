import nextEnv from '@next/env'

// Load .env the same way Next.js does (existing process env vars win)
nextEnv.loadEnvConfig(process.cwd())
