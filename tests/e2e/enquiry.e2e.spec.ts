import { expect, test, type APIRequestContext } from '@playwright/test'

/**
 * Enquiry form end to end. Needs the seeded test database (heart2heart-water business and an
 * admin user). Set E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD if they differ from the defaults.
 */
const adminEmail = process.env.E2E_ADMIN_EMAIL || 'admin@example.com'
const adminPassword = process.env.E2E_ADMIN_PASSWORD || 'test-password-123'

// A fresh fake client IP per test run, so the per-IP rate limit doesn't trip on repeat runs
const fakeIp = `203.0.113.${Math.floor(Math.random() * 250) + 1}`
test.use({ extraHTTPHeaders: { 'x-forwarded-for': fakeIp } })

async function adminToken(request: APIRequestContext) {
  const res = await request.post('/api/users/login', {
    data: { email: adminEmail, password: adminPassword },
  })
  expect(res.ok()).toBeTruthy()
  return ((await res.json()) as { token: string }).token
}

test('submits an enquiry from a business page', async ({ page, request }) => {
  const email = `e2e-${Date.now()}@example.com`
  await page.goto('/businesses/heart2heart-water')

  const form = page
    .locator('form')
    .filter({ has: page.getByRole('button', { name: 'Send Inquiry' }) })
  await form.getByLabel('Full name').fill('Fatmata Sesay')
  await form.getByLabel('Email address').fill(email)
  await form.getByLabel('Telephone').fill('+232 76 123 456')
  await form.getByLabel('Message').fill('Please send me a price list for 500 bags of water.')
  // When Turnstile is enabled, wait for its token like a real visitor would
  const turnstileToken = form.locator('input[name="cf-turnstile-response"]')
  if (await turnstileToken.count()) {
    await expect(turnstileToken).not.toHaveValue('', { timeout: 15_000 })
  }
  await form.getByRole('button', { name: 'Send Inquiry' }).click()

  await expect(page.getByRole('status')).toContainText('Your inquiry has been received')
  await expect(page.getByRole('status')).toContainText('Heart2Heart Water Factory team')

  // The enquiry is stored against the right business
  const token = await adminToken(request)
  const res = await request.get('/api/enquiries', {
    headers: { Authorization: `JWT ${token}` },
    params: { 'where[email][equals]': email, depth: '1' },
  })
  const { docs } = (await res.json()) as {
    docs: {
      id: number
      type: string
      status: string
      pageUrl: string
      ipHash?: string
      business: { slug: string } | null
    }[]
  }
  expect(docs).toHaveLength(1)
  expect(docs[0]).toMatchObject({
    type: 'general',
    status: 'new',
    pageUrl: '/businesses/heart2heart-water',
    business: { slug: 'heart2heart-water' },
  })
  expect(docs[0].ipHash).toBeUndefined()

  await request.delete(`/api/enquiries/${docs[0].id}`, {
    headers: { Authorization: `JWT ${token}` },
  })
})

test('shows field errors and keeps what was typed', async ({ page }) => {
  await page.goto('/businesses/heart2heart-water')

  const form = page
    .locator('form')
    .filter({ has: page.getByRole('button', { name: 'Send Inquiry' }) })
  await form.getByLabel('Full name').fill('Fatmata Sesay')
  await form.getByLabel('Email address').fill('not-an-email')
  await form.getByLabel('Message').fill('Too short')
  await form.getByRole('button', { name: 'Send Inquiry' }).click()

  await expect(form.getByRole('alert')).toContainText('Please check the highlighted fields.')
  await expect(form.getByText('Please enter a valid email address.')).toBeVisible()
  await expect(form.getByText('Please tell us a little more')).toBeVisible()
  await expect(form.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true')
  await expect(form.getByLabel('Full name')).toHaveValue('Fatmata Sesay')
  await expect(form.getByLabel('Message')).toHaveValue('Too short')
})

test('accepts a telephone number instead of an email, with a topic', async ({ page, request }) => {
  const phone = `+232 7${Date.now().toString().slice(-7)}`
  await page.goto('/contact')

  const form = page
    .locator('form')
    .filter({ has: page.getByRole('button', { name: 'Send Inquiry' }) })
  await form.getByLabel('Full name').fill('Mohamed Kamara')
  await form.getByLabel('Message').fill('I would like to know about vacancies in Lunsar.')

  // Neither email nor telephone: asked for one of them
  await form.getByRole('button', { name: 'Send Inquiry' }).click()
  await expect(form.getByText('Please give an email address or a telephone number')).toBeVisible()

  await form.getByLabel('Telephone').fill(phone)
  await form.getByLabel('Business or topic').selectOption('careers')
  const turnstileToken = form.locator('input[name="cf-turnstile-response"]')
  if (await turnstileToken.count()) {
    await expect(turnstileToken).not.toHaveValue('', { timeout: 15_000 })
  }
  await form.getByRole('button', { name: 'Send Inquiry' }).click()
  await expect(page.getByRole('status')).toContainText('Thank you for contacting Zeebundu')

  const token = await adminToken(request)
  const res = await request.get('/api/enquiries', {
    headers: { Authorization: `JWT ${token}` },
    params: { 'where[phone][equals]': phone, depth: '0' },
  })
  const { docs } = (await res.json()) as {
    docs: { id: number; type: string; email?: string | null; business?: number | null }[]
  }
  expect(docs).toHaveLength(1)
  expect(docs[0]).toMatchObject({ type: 'careers' })
  expect(docs[0].email ?? null).toBeNull()
  expect(docs[0].business ?? null).toBeNull()

  await request.delete(`/api/enquiries/${docs[0].id}`, {
    headers: { Authorization: `JWT ${token}` },
  })
})
