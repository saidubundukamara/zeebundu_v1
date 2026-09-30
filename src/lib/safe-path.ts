/** Only allow same-site relative paths (blocks open redirects like `//evil.com` or `https://…`). */
export const safePath = (value: string | null | undefined) =>
  value && value.startsWith('/') && !value.startsWith('//') && !value.includes('\\') ? value : '/'
