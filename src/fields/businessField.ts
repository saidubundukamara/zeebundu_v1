import type { RelationshipField, Validate } from 'payload'

import { getUserBusinessIDs, isGroupUser } from '@/access'

/**
 * Optional link to a business. Business editors must pick one of their own businesses,
 * which is what scopes the document to them; group users may leave it empty (group-level).
 */
const validateBusiness: Validate = (value, { req: { user } }) => {
  if (!user || isGroupUser(user)) return true
  const id = typeof value === 'object' && value ? (value as { id: number }).id : value
  if (!id) return 'Choose the business this belongs to.'
  return getUserBusinessIDs(user).includes(id as number)
    ? true
    : 'You can only choose a business you manage.'
}

export const businessField = (): RelationshipField => ({
  name: 'business',
  type: 'relationship',
  relationTo: 'businesses',
  index: true,
  validate: validateBusiness,
  filterOptions: ({ user }) => {
    if (!user || isGroupUser(user)) return true
    return { id: { in: getUserBusinessIDs(user) } }
  },
  admin: {
    position: 'sidebar',
    description: 'Leave empty for group-wide content.',
  },
})
