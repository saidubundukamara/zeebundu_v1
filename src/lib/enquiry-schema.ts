import { z } from 'zod'

export const enquiryTypes = [
  { value: 'general', label: 'General enquiry' },
  { value: 'sales', label: 'Sales or quote' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'media', label: 'Media' },
] as const

export const enquirySchema = z.object({
  name: z
    .string({ error: 'Please enter your name.' })
    .trim()
    .min(2, 'Please enter your name.')
    .max(120),
  email: z.email({ error: 'Please enter a valid email address.' }).max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[\d\s+()-]*$/, 'Please enter a valid phone number.')
    .optional(),
  type: z.enum(['general', 'sales', 'partnership', 'media']),
  business: z.coerce.number().int().positive().optional(),
  message: z
    .string({ error: 'Please enter a message.' })
    .trim()
    .min(10, 'Please tell us a little more (at least 10 characters).')
    .max(5000),
  pageUrl: z.string().max(500).optional(),
})

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<keyof z.infer<typeof enquirySchema>, string[]>>
  values?: Record<string, string>
}
