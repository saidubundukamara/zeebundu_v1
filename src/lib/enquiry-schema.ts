import { z } from 'zod'

/** Topics offered after the businesses in the contact form's "Business or topic" list */
export const enquiryTopics = [
  { value: 'careers', label: 'Careers' },
  { value: 'partnership', label: 'Partnerships' },
  { value: 'general', label: 'General Inquiry' },
] as const

/**
 * The "Business or topic" select posts `about`: a topic value, or `business:<id>`.
 * Splits it into the stored `business` and `type` fields.
 */
export const fromAbout = (about: string | undefined): { business?: string; type?: string } => {
  if (!about) return {}
  if (about.startsWith('business:')) return { business: about.slice(9), type: 'general' }
  return enquiryTopics.some((t) => t.value === about) ? { type: about } : {}
}

export const enquirySchema = z
  .object({
    name: z
      .string({ error: 'Please enter your name.' })
      .trim()
      .min(2, 'Please enter your name.')
      .max(120),
    email: z.email({ error: 'Please enter a valid email address.' }).max(200).optional(),
    phone: z
      .string()
      .trim()
      .max(40)
      .regex(/^[\d\s+()-]*$/, 'Please enter a valid phone number.')
      .optional(),
    organization: z.string().trim().max(200).optional(),
    type: z.enum(['general', 'sales', 'partnership', 'careers', 'media']).default('general'),
    business: z.coerce.number().int().positive().optional(),
    message: z
      .string({ error: 'Please enter a message.' })
      .trim()
      .min(10, 'Please tell us a little more (at least 10 characters).')
      .max(5000),
    pageUrl: z.string().max(500).optional(),
  })
  .refine((d) => d.email || d.phone, {
    path: ['email'],
    message: 'Please give an email address or a telephone number so we can reply.',
  })

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  /** Set for failures that aren't about a field */
  code?: 'turnstile' | 'rate-limited'
  message?: string
  errors?: Partial<Record<keyof z.infer<typeof enquirySchema>, string[]>>
  values?: Record<string, string>
}
