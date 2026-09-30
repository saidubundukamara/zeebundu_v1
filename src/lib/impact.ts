import type { ImpactProgramme } from '@/payload-types'

export const impactPillarLabels: Record<ImpactProgramme['pillar'], string> = {
  education: 'Education',
  health: 'Health',
  environment: 'Environment',
  enterprise: 'Enterprise',
  community: 'Community',
}
