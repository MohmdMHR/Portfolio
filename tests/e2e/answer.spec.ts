import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('the recruiter answer', () => {
  test.use({ javaScriptEnabled: false })

  test('is all there with JavaScript off', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mohamed')
    await expect(page.getByText('Front-End Lead and Senior Full-Stack Engineer')).toBeVisible()
    await expect(page.getByText('Based in Dubai, UAE')).toBeVisible()
    await expect(page.getByText('React, Vue, Nuxt, TypeScript')).toBeVisible()
    await expect(page.locator('.hero .cta').getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/Mohamed-Mahir-CV.pdf')
    await expect(page.locator('.hero .cta').getByRole('link', { name: 'Email' })).toHaveAttribute('href', /^mailto:/)
  })

  test('opens a role with JavaScript off', async ({ page }) => {
    await page.goto('/')
    const role = page.locator('details.role').filter({ hasText: 'JP&CO' })

    await role.locator('summary').click()

    await expect(role.getByText('Laravel REST APIs')).toBeVisible()
  })
})

test('contact opens Gmail addressed to Mohamed, with email as a fallback', async ({ page }) => {
  await page.goto('/')
  const contact = page.locator('#contact')
  const gmail = new URL(await contact.getByRole('link', { name: 'Write in Gmail' }).getAttribute('href') ?? '')

  expect(gmail.hostname).toBe('mail.google.com')
  expect(gmail.searchParams.get('to')).toBe('mohamdmahir@gmail.com')
  await expect(contact.getByRole('link', { name: 'Use your email app' })).toHaveAttribute('href', 'mailto:mohamdmahir@gmail.com')
  await expect(contact.getByText('mohamdmahir@gmail.com')).toBeVisible()
})

test('serves the CV', async ({ request }) => {
  const response = await request.get('/Mohamed-Mahir-CV.pdf')

  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('pdf')
})

test('the Arabic page reads right to left', async ({ page }) => {
  await page.goto('/ar')

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('nothing scrolls sideways', async ({ page }) => {
  await page.goto('/')

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)

  expect(overflow).toBeLessThanOrEqual(0)
})

for (const theme of ['dark', 'light']) {
  test(`has no accessibility violations in ${theme} mode`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem('theme', value), theme)
    await page.goto('/')
    await page.locator('details.role').first().waitFor()

    const buttons = page.locator('.labnav button')
    for (let index = 0; index < await buttons.count(); index++) {
      await buttons.nth(index).click()
      const { violations } = await new AxeBuilder({ page }).exclude('canvas').analyze()

      expect(violations.map(({ id, nodes }) => `${id}: ${nodes[0]?.target}`)).toEqual([])
    }
  })
}
