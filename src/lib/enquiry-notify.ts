import type { Payload } from 'payload'

import { enquiryAutoReplyEmail, enquiryNotificationEmail } from '@/lib/email/templates'
import type { Enquiry } from '@/payload-types'

export type EnquiryRecipients = {
  /** Business enquiry inbox, falling back to the group inbox */
  to?: string
  /** Group inbox, when it differs from `to` */
  cc?: string
  /** Business name, or the group name for general enquiries */
  businessName: string
  groupName: string
  phone?: string | null
  whatsapp?: string | null
}

/** Works out where an enquiry goes: the business's inbox (CC group), else the group inbox */
export async function resolveRecipients(
  payload: Payload,
  businessId?: number | null,
): Promise<EnquiryRecipients> {
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const groupName = settings.groupName || 'Zeebundu Group'
  const groupInbox = settings.contact?.enquiryEmail || undefined

  const business = businessId
    ? await payload
        .findByID({ collection: 'businesses', id: businessId, depth: 0, draft: false })
        .catch(() => null)
    : null

  const to = business?.contact?.enquiryEmail || groupInbox
  const cc =
    groupInbox && to && groupInbox.toLowerCase() !== to.toLowerCase() ? groupInbox : undefined

  return {
    to,
    cc,
    businessName: business?.name || groupName,
    groupName,
    phone: settings.contact?.phone,
    whatsapp: settings.contact?.whatsapp,
  }
}

/**
 * Emails the business (CC group) and sends the sender an auto-reply. Never throws: the enquiry
 * is already saved, so failures are only logged.
 */
export async function sendEnquiryEmails(
  payload: Payload,
  enquiry: Pick<Enquiry, 'id' | 'name' | 'email' | 'phone' | 'type' | 'message' | 'pageUrl'> & {
    createdAt?: string
    business?: Enquiry['business']
  },
  serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '',
): Promise<void> {
  try {
    const businessId =
      typeof enquiry.business === 'object' ? enquiry.business?.id : enquiry.business
    const recipients = await resolveRecipients(payload, businessId)
    const jobs: Promise<unknown>[] = []

    if (recipients.to) {
      const email = enquiryNotificationEmail({
        enquiry,
        businessName: recipients.businessName,
        adminUrl: `${serverUrl}/admin/collections/enquiries/${enquiry.id}`,
      })
      jobs.push(
        payload.sendEmail({
          to: recipients.to,
          cc: recipients.cc,
          replyTo: { name: enquiry.name.replace(/[\r\n"<>]/g, ' '), address: enquiry.email },
          ...email,
        }),
      )
    } else {
      payload.logger.warn(
        `[enquiry] No enquiry inbox set for ${recipients.businessName} or the group (Group details → Head office contact → Group enquiries inbox); enquiry ${enquiry.id} was saved but nobody was emailed.`,
      )
    }

    jobs.push(
      payload.sendEmail({
        to: enquiry.email,
        replyTo: recipients.to,
        ...enquiryAutoReplyEmail({
          name: enquiry.name,
          businessName: recipients.businessName,
          groupName: recipients.groupName,
          phone: recipients.phone,
          whatsapp: recipients.whatsapp,
        }),
      }),
    )

    const results = await Promise.allSettled(jobs)
    for (const result of results) {
      if (result.status === 'rejected') {
        payload.logger.error({
          err: result.reason,
          msg: `[enquiry] email failed for ${enquiry.id}`,
        })
      }
    }
  } catch (err) {
    payload.logger.error({ err, msg: `[enquiry] could not send emails for ${enquiry.id}` })
  }
}
