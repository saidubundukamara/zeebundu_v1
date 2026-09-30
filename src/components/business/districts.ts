import { districts } from '@/fields/districts'

/** Human label for a stored district value, e.g. `western-area-urban` → "Western Area Urban". */
export const districtLabel = (value?: string | null) =>
  value ? (districts.find((d) => d.value === value)?.label ?? value) : null
