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
  expect(gmail.searchParams.get('su')).toBe('Opportunity for Mohamed Mahir')
  await expect(contact.getByRole('link', { name: 'Use your email app' })).toHaveAttribute('href', /^mailto:mohamdmahir@gmail\.com/)
  await expect(contact.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/971526769781')
  await expect(contact.getByText('mohamdmahir@gmail.com')).toBeVisible()
})

test('serves the CV', async ({ request }) => {
  const response = await request.get('/Mohamed-Mahir-CV.pdf')

  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('pdf')
})

test('the Arabic site is complete and reads right to left', async ({ page }) => {
  await page.goto('/ar')

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('محمد')
  await expect(page.locator('#career h2')).toHaveText('ثماني سنوات في خريطة واحدة')
  await expect(page.locator('details.role')).toHaveCount(6)
  await expect(page.locator('.labnav button')).toHaveCount(7)
  await expect(page.locator('#contact h2')).toHaveText('راسل محمدًا')
  await expect(page.locator('#contact').getByRole('link', { name: 'واتساب' })).toHaveAttribute('href', /wa\.me/)
})

test('Arabic and English link to each other', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('language').click()
  await expect(page).toHaveURL(/\/ar/)
  await page.getByTestId('language').click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mohamed')
})

test('the Arabic skill list stays right-aligned next to the roles', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the map is one column on a phone')
  await page.goto('/ar')
  const skills = await page.locator('.skills').boundingBox()
  const roles = await page.locator('.roles').boundingBox()

  expect(skills!.x).toBeGreaterThan(roles!.x)
})

for (const path of ['/', '/ar']) {
  test(`nothing scrolls sideways on ${path}`, async ({ page }) => {
    await page.goto(path)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
}

for (const [theme, path] of [['dark', '/'], ['light', '/'], ['dark', '/ar'], ['light', '/ar']] as const) {
  test(`has no accessibility violations in ${theme} mode on ${path}`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem('theme', value), theme)
    await page.goto(path)
    await page.locator('details.role').first().waitFor()

    const buttons = page.locator('.labnav button')
    for (let index = 0; index < await buttons.count(); index++) {
      await buttons.nth(index).click()
      const { violations } = await new AxeBuilder({ page }).exclude('canvas').analyze()

      expect(violations.map(({ id, nodes }) => `${id}: ${nodes[0]?.target}`)).toEqual([])
    }
  })
}
