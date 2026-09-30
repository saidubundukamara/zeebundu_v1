/** True when DATABASE_URI points at this machine (Docker Postgres), not a hosted database. */
export const isLocalDatabase = (uri = process.env.DATABASE_URI ?? '') =>
  /@(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(uri)
