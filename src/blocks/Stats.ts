import type { Block } from 'payload'

import { statsArray } from '@/fields/stats'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [{ name: 'heading', type: 'text' }, statsArray()],
}
