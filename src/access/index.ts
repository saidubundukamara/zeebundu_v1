import type { Access, FieldAccess, Where } from 'payload'

import type { User } from '@/payload-types'

export type Role = User['role']

const hasRole = (user: unknown, ...roles: Role[]): boolean =>
  Boolean(user && typeof user === 'object' && 'role' in user && roles.includes((user as User).role))

export const isSuperAdminUser = (user: unknown) => hasRole(user, 'super-admin')

/** Super-admins and group editors manage content for every business. */
export const isGroupUser = (user: unknown) => hasRole(user, 'super-admin', 'group-editor')

/** IDs of the businesses a (business-editor) user is assigned to via the multi-tenant `tenants` array. */
export const getUserBusinessIDs = (user: unknown): number[] => {
  const tenants = (user as Partial<User> | null)?.tenants ?? []
  return tenants
    .map(({ tenant }) => (typeof tenant === 'object' && tenant ? tenant.id : tenant))
    .filter((id): id is number => typeof id === 'number')
}

const published: Where = { _status: { equals: 'published' } }

export const anyone: Access = () => true
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
export const superAdmin: Access = ({ req: { user } }) => isSuperAdminUser(user)
export const groupEditors: Access = ({ req: { user } }) => isGroupUser(user)

export const superAdminField: FieldAccess = ({ req: { user } }) => isSuperAdminUser(user)
export const groupEditorsField: FieldAccess = ({ req: { user } }) => isGroupUser(user)

/** Public sees published docs only; any logged-in user sees drafts too. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => (user ? true : published)

/**
 * Group users: everything. Business editors: only docs whose `business` field is one of their
 * businesses (docs with no business are group-level and stay group-only).
 */
export const ownBusinessOrGroup =
  (field = 'business'): Access =>
  ({ req: { user } }) => {
    if (!user) return false
    if (isGroupUser(user)) return true
    const ids = getUserBusinessIDs(user)
    return ids.length ? ({ [field]: { in: ids } } satisfies Where) : false
  }

/** Like publishedOrAuthenticated, but business editors only see drafts of their own business. */
export const publishedOrOwnBusiness =
  (field = 'business'): Access =>
  (args) => {
    const { user } = args.req
    if (!user) return published
    if (isGroupUser(user)) return true
    const own = ownBusinessOrGroup(field)(args)
    return own ? { or: [published, own as Where] } : published
  }
