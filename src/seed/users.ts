import type { Payload } from 'payload'

import { isLocalDatabase } from './env'

/**
 * Demo accounts for local development and the e2e tests: one per role, so you
 * can see what each kind of editor gets in /admin.
 *
 * Opt-in with SEED_DEMO_USERS=true, and only against a local database: these
 * share a known password, so they must never exist in production.
 */
const demoUsers = [
  { email: 'admin@example.com', name: 'Demo Super Admin', role: 'super-admin' as const },
  { email: 'editor@example.com', name: 'Demo Group Editor', role: 'group-editor' as const },
  {
    email: 'pharmacy.editor@example.com',
    name: 'Demo Health & Beauty Editor',
    role: 'business-editor' as const,
    businesses: ['pharmacy', 'cosmetics-salon'],
  },
  {
    email: 'fuel.editor@example.com',
    name: 'Demo Energy Editor',
    role: 'business-editor' as const,
    businesses: ['gas-stations', 'petroleum-services'],
  },
]

export async function seedDemoUsers(
  payload: Payload,
  businessIDs: Record<string, number>,
  log: (msg: string) => void,
) {
  if (process.env.SEED_DEMO_USERS !== 'true') return
  if (process.env.NODE_ENV === 'production' || !isLocalDatabase()) {
    log('demo users skipped: only seeded against a local database outside production')
    return
  }
  // Same default the e2e tests use (tests/e2e/enquiry.e2e.spec.ts)
  const password = process.env.SEED_DEMO_PASSWORD || 'test-password-123'

  for (const user of demoUsers) {
    const tenants = (user.businesses ?? [])
      .map((slug) => businessIDs[slug])
      .filter((id): id is number => typeof id === 'number')
      .map((tenant) => ({ tenant }))
    const data = { name: user.name, role: user.role, tenants }

    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: user.email } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      // Keep role and assignments in step; leave the password as the developer set it
      await payload.update({ collection: 'users', id: existing.docs[0].id, data, depth: 0 })
    } else {
      await payload.create({
        collection: 'users',
        data: { ...data, email: user.email, password },
        depth: 0,
      })
    }
  }
  log(`${demoUsers.length} demo users (${demoUsers.map((u) => u.email).join(', ')})`)
}
