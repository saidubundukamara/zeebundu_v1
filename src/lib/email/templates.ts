/**
 * Plain, inline-styled email templates (HTML + text). Everything a visitor typed is escaped.
 */

const forest = '#0F3D2E'
const gold = '#C8A24A'
const stone = '#44403C'

export type RenderedEmail = { subject: string; html: string; text: string }

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Escaped text with line breaks kept */
const multiline = (value: unknown) => escapeHtml(value).replace(/\r?\n/g, '<br>')

/** Removes line breaks so user input can't add lines to a header-like text line */
const oneLine = (value: unknown) =>
  String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()

const layout = (heading: string, body: string) => `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#F5F5F4;font-family:Arial,Helvetica,sans-serif;color:${stone};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F4;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:8px;overflow:hidden;">
        <tr><td style="background:${forest};padding:20px 28px;border-bottom:4px solid ${gold};">
          <p style="margin:0;color:#FFFFFF;font-size:18px;font-weight:bold;letter-spacing:0.5px;">Zeebundu Group</p>
        </td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 16px;color:${forest};font-size:20px;line-height:1.3;">${heading}</h1>
          ${body}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

const p = (html: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">${html}</p>`

export const enquiryTypeLabels: Record<string, string> = {
  general: 'General',
  sales: 'Sales',
  partnership: 'Partnership',
  media: 'Media',
}

export type EnquiryEmailData = {
  id: number | string
  name: string
  email: string
  phone?: string | null
  type: string
  message: string
  pageUrl?: string | null
  createdAt?: string
}

/** Notification to the business (or group) inbox */
export function enquiryNotificationEmail({
  enquiry,
  businessName,
  adminUrl,
}: {
  enquiry: EnquiryEmailData
  /** Business name, or the group name for general enquiries */
  businessName: string
  adminUrl: string
}): RenderedEmail {
  const typeLabel = enquiryTypeLabels[enquiry.type] ?? 'General'
  const subject = `New website enquiry: ${typeLabel} — ${oneLine(businessName)}`
  const rows: [string, string | null | undefined][] = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['About', typeLabel],
    ['For', businessName],
    ['Sent from page', enquiry.pageUrl],
    ['Received', enquiry.createdAt ? formatDate(enquiry.createdAt) : undefined],
  ]
  const present = rows.filter(([, v]) => v)

  const html = layout(
    `New ${escapeHtml(typeLabel.toLowerCase())} enquiry for ${escapeHtml(businessName)}`,
    `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;font-size:14px;">
      ${present
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#78716C;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;vertical-align:top;">${
              label === 'Email'
                ? `<a href="mailto:${escapeHtml(value)}" style="color:${forest};">${escapeHtml(value)}</a>`
                : escapeHtml(value)
            }</td></tr>`,
        )
        .join('')}
    </table>
    <div style="margin:0 0 24px;padding:16px;background:#FAFAF9;border-left:4px solid ${gold};font-size:15px;line-height:1.6;">${multiline(enquiry.message)}</div>
    ${p('Reply to this email to answer the sender directly.')}
    <p style="margin:0;"><a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:${forest};color:#FFFFFF;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:14px;font-weight:bold;">Open in the CMS</a></p>`,
  )

  const text = [
    `New ${typeLabel.toLowerCase()} enquiry for ${businessName}`,
    '',
    ...present.map(([label, value]) => `${label}: ${oneLine(value)}`),
    '',
    'Message:',
    enquiry.message,
    '',
    'Reply to this email to answer the sender directly.',
    `Open in the CMS: ${adminUrl}`,
  ].join('\n')

  return { subject, html, text }
}

/** Short acknowledgement to the person who sent the enquiry */
export function enquiryAutoReplyEmail({
  name,
  businessName,
  groupName,
  phone,
  whatsapp,
}: {
  name: string
  /** Business name, or the group name for general enquiries */
  businessName: string
  groupName: string
  phone?: string | null
  whatsapp?: string | null
}): RenderedEmail {
  const firstName = oneLine(name).split(' ')[0] || oneLine(name)
  const team = businessName === groupName ? `the ${groupName} team` : `the ${businessName} team`
  const subject = `We’ve received your message — ${oneLine(businessName)}`
  const contactLines = [
    phone ? `Phone: ${phone}` : null,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
  ].filter(Boolean) as string[]

  const html = layout(
    `Thank you, ${escapeHtml(firstName)}`,
    [
      p(`We’ve received your message and passed it to ${escapeHtml(team)}.`),
      p('We aim to reply within 1–2 working days.'),
      contactLines.length
        ? p(
            `If it’s urgent, you’re welcome to call or message us:<br>${contactLines
              .map(escapeHtml)
              .join('<br>')}`,
          )
        : '',
      p(`With best wishes,<br>${escapeHtml(groupName)}`),
      `<p style="margin:20px 0 0;font-size:12px;color:#78716C;line-height:1.5;">You’re getting this email because you sent us a message through our website. There’s no need to reply unless you’d like to add something.</p>`,
    ].join(''),
  )

  const text = [
    `Thank you, ${firstName}`,
    '',
    `We’ve received your message and passed it to ${team}.`,
    'We aim to reply within 1–2 working days.',
    ...(contactLines.length
      ? ['', 'If it’s urgent, you’re welcome to call or message us:', ...contactLines]
      : []),
    '',
    'With best wishes,',
    groupName,
    '',
    'You’re getting this email because you sent us a message through our website.',
  ].join('\n')

  return { subject, html, text }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Freetown',
  })
}
