'use client'

import { CheckCircle2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useActionState, useId } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitEnquiry } from '@/lib/enquiry-action'
import { enquiryTypes, type EnquiryState } from '@/lib/enquiry-schema'
import { cn } from '@/lib/utils'

const initialState: EnquiryState = { status: 'idle' }

const selectClass =
  'h-10 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive'

/**
 * Enquiry form. Pass `business` to route it to one business (hidden field);
 * pass `businesses` to let the sender choose (Contact page).
 */
export function EnquiryForm({
  business,
  businesses,
  className,
}: {
  business?: { id: number; name: string }
  businesses?: { id: number; name: string }[]
  className?: string
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initialState)
  const pathname = usePathname()
  const id = useId()

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className={cn(
          'flex flex-col items-start gap-3 rounded-lg border border-forest-200 bg-forest-50 p-6',
          className,
        )}
      >
        <CheckCircle2Icon aria-hidden className="size-8 text-forest-600" />
        <h3 className="font-heading text-h3 text-forest-800">
          Thank you, we’ve received your message
        </h3>
        <p className="text-sm text-stone-700">
          {business ? `The ${business.name} team` : 'Our team'} will get back to you as soon as
          possible.
        </p>
      </div>
    )
  }

  const err = (field: keyof NonNullable<EnquiryState['errors']>) => state.errors?.[field]?.[0]
  const field = (name: string) => ({
    id: `${id}-${name}`,
    name,
    defaultValue: state.values?.[name],
    'aria-invalid': Boolean(err(name as never)) || undefined,
    'aria-describedby': err(name as never) ? `${id}-${name}-error` : undefined,
  })
  const fieldError = (name: keyof NonNullable<EnquiryState['errors']>) =>
    err(name) ? (
      <p id={`${id}-${name}-error`} className="text-sm text-destructive">
        {err(name)}
      </p>
    ) : null

  return (
    <form action={action} noValidate className={cn('space-y-5', className)}>
      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <input type="hidden" name="pageUrl" value={pathname} />
      {business && <input type="hidden" name="business" value={business.id} />}
      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${id}-name`}>Your name</Label>
          <Input {...field('name')} autoComplete="name" required className="h-10 bg-white" />
          {fieldError('name')}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            {...field('email')}
            type="email"
            autoComplete="email"
            required
            className="h-10 bg-white"
          />
          {fieldError('email')}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-phone`}>
            Phone <span className="font-normal text-stone-500">(optional)</span>
          </Label>
          <Input {...field('phone')} type="tel" autoComplete="tel" className="h-10 bg-white" />
          {fieldError('phone')}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-type`}>What is it about?</Label>
          <select
            {...field('type')}
            defaultValue={state.values?.type ?? 'general'}
            className={selectClass}
          >
            {enquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        {!business && businesses?.length ? (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={`${id}-business`}>Which business?</Label>
            <select
              {...field('business')}
              defaultValue={state.values?.business ?? ''}
              className={selectClass}
            >
              <option value="">Zeebundu Group (general)</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-message`}>Message</Label>
        <Textarea {...field('message')} required rows={6} className="bg-white" />
        {fieldError('message')}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-stone-500">We only use your details to reply to this enquiry.</p>
        <Button type="submit" variant="highlight" size="xl" disabled={pending}>
          {pending ? 'Sending…' : 'Send enquiry'}
        </Button>
      </div>
    </form>
  )
}
