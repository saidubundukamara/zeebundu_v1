import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'node',
    include: ['tests/int/**/*.int.spec.ts'],
    setupFiles: ['./tests/setup.ts'],
    hookTimeout: 60_000,
    testTimeout: 30_000,
    // Integration tests share one database
    fileParallelism: false,
  },
})
