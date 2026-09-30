import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end tests against an already running site (start it yourself, e.g. `npm run dev -- -p 3100`
 * with a seeded test database). Uses the installed Chrome, so no browser download is needed.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  // Kept inside node_modules so test output is never committed
  outputDir: 'node_modules/.cache/playwright/test-results',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  timeout: 60_000,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3100',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }],
})
