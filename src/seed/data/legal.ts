/**
 * Starter privacy policy and terms of use. Plain-language placeholders based on what the
 * site actually collects; have them reviewed before launch (docs/LAUNCH_CHECKLIST.md).
 * Lines starting with "## " become headings.
 */
type LegalPage = { title: string; body: string[] }

const lastUpdated = 'Last updated: 30 September 2026.'

const privacy: LegalPage = {
  title: 'Privacy Policy',
  body: [
    'This policy explains what personal information Zeebundu Group ("Zeebundu", "we", "us") collects through this website, why we collect it and how we look after it.',
    '## Who we are',
    'Zeebundu is a group of businesses based in Sierra Leone. This website covers the group and its businesses. Questions about this policy can be sent through our contact page.',
    '## What we collect',
    'When you send an enquiry we collect your name, email address, phone number (if you give one), the type of enquiry, the business it is about and your message. We also record the page you sent it from.',
    'We do not ask for payment details, identity documents or other sensitive information on this website.',
    '## Analytics and spam protection',
    'We use Plausible Analytics to count visits and see which pages are popular. Plausible does not use cookies and does not collect personal information or track you across other websites.',
    'Our forms use Cloudflare Turnstile to block spam. Turnstile checks your browser to tell people from bots and is covered by Cloudflare’s own privacy policy.',
    '## How we use your information',
    'We use your information to reply to your enquiry, to pass it to the Zeebundu business best placed to help. We do not sell your information or use it for advertising.',
    '## Who can see it',
    'Enquiries are seen by group staff and by the team at the business your enquiry is about. We use trusted service providers to host the website, store data and send email; they may only use your information to provide those services to us.',
    '## How long we keep it',
    'We keep enquiries for as long as we need them to deal with your request and keep reasonable business records.',
    '## Your choices',
    'You can ask us to show you the information we hold about you, correct it or delete it. Send your request through our contact page and we will reply as soon as we can.',
    '## Changes to this policy',
    'We may update this policy from time to time. The latest version will always be on this page.',
    lastUpdated,
  ],
}

const terms: LegalPage = {
  title: 'Terms of Use',
  body: [
    'These terms apply to your use of this website. By using the site you accept them.',
    '## About this website',
    'This website is run by Zeebundu Group, based in Sierra Leone. It gives general information about the group and its businesses.',
    '## Information on the site',
    'We try to keep the information here accurate and up to date, but products, services, prices, rates and opening hours can change without notice. Please contact the relevant business to confirm details before relying on them.',
    'Products and services from Zeebundu businesses, including loans, foreign exchange, accommodation and retail, are provided under their own terms, which the business will give you.',
    '## Using the site',
    'Please use the site lawfully. Do not try to disrupt it, gain unauthorised access to it, or use our forms to send spam or misleading information.',
    '## Our content',
    'The text, logos, photographs and design of this site belong to Zeebundu or are used with permission. You may share links to our pages, but you may not copy or reuse our content for commercial purposes without our written permission.',
    '## Links to other websites',
    'Where we link to other websites, we do so for your convenience. We are not responsible for their content or how they handle your information.',
    '## Liability',
    'The site is provided "as is". So far as the law allows, we are not liable for any loss arising from your use of the site or reliance on its content.',
    '## Governing law',
    'These terms are governed by the laws of Sierra Leone.',
    '## Changes and contact',
    'We may update these terms from time to time; the latest version will always be on this page. Questions can be sent through our contact page.',
    lastUpdated,
  ],
}

export const legalPages: Record<'privacy' | 'terms', LegalPage> = { privacy, terms }
