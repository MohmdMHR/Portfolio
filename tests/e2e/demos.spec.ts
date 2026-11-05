import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
})

const openDemo = (page: import('@playwright/test').Page, name: string) =>
  page.locator('.labnav').getByRole('button', { name }).click()

test('the switch changes theme and remembers it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.reload()

  await page.getByRole('button', { name: 'Light mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('button', { name: 'Dark mode' })).toBeVisible()
})

test('picking a skill highlights only the roles that used it', async ({ page }) => {
  await page.getByRole('button', { name: 'Angular' }).click()

  await expect(page.locator('details.role.hit')).toHaveCount(1)
  await expect(page.locator('details.role.hit')).toContainText('JP&CO')
  await expect(page.locator('details.role.dim')).toHaveCount(5)
})

test('a front-end patch hiding a backend bug stops at human review', async ({ page }) => {
  await page.getByRole('button', { name: 'Front-end patch hiding a backend bug' }).click()

  await expect(page.locator('.gate.no')).toContainText('Human review')
  await expect(page.locator('.gate').last()).not.toHaveClass(/ok/)
  await expect(page.locator('.verdict')).toContainText('hides the real bug')
})

test('a clean change reaches merged', async ({ page }) => {
  await page.getByRole('button', { name: 'A clean, scoped change' }).click()

  await expect(page.locator('.gate.no')).toHaveCount(0)
  await expect(page.locator('.gate').last()).toHaveClass(/ok/)
})

test('a renamed field breaks the trusting version and is caught by the parsed one', async ({ page }) => {
  await openDemo(page, 'Contract drift')
  await page.getByRole('button', { name: 'Backend renames a field' }).click()

  await expect(page.getByTestId('trusting')).toContainText('Hello undefined')
  await expect(page.getByText('This order could not load.')).toBeVisible()
  await expect(page.getByText('with the exact field: customer')).toBeVisible()
})

test('a release reaches customers and the flag takes it back', async ({ page }) => {
  await openDemo(page, 'Feature flags')
  await expect(page.getByTestId('production')).toHaveText('Old checkout')

  await page.getByRole('button', { name: 'Release to customers' }).click()
  await expect(page.getByTestId('production')).toHaveText('New checkout')

  await page.getByRole('button', { name: 'Something broke: turn it off' }).click()
  await expect(page.getByTestId('production')).toHaveText('Old checkout')
  await expect(page.getByTestId('staging')).toHaveText('New checkout')
})

test('a retry redeems twice only without the key', async ({ page }) => {
  await openDemo(page, 'Idempotency')
  await expect(page.getByTestId('ledger')).toHaveText('Redeemed once')

  await page.getByRole('button', { name: 'Run without one' }).click()
  await expect(page.getByTestId('ledger')).toHaveText('Redeemed twice')
})

test('the controller view switches', async ({ page }) => {
  await openDemo(page, 'Thin controllers')
  await expect(page.locator('.lab:visible pre')).toContainText('PlaceOrder')

  await page.getByRole('button', { name: 'Legacy, until it is touched' }).click()
  await expect(page.locator('.lab:visible pre')).toContainText('$request->all()')
})

test('rebranding changes the tokens', async ({ page }) => {
  await openDemo(page, 'One engine, many brands')
  await page.getByRole('button', { name: 'Brand two' }).click()

  await expect(page.locator('.lab:visible pre')).toContainText('#C2410C')
  await expect(page.locator('.tile')).toHaveText('Good to see you')
})

test('the direction demo flips the interface and keeps numbers readable', async ({ page }) => {
  await openDemo(page, 'RTL and LTR')
  const flip = page.getByTestId('flip')
  await expect(flip).toHaveAttribute('dir', 'ltr')

  await page.locator('.lab:visible').getByRole('button', { name: 'العربية، RTL' }).click()

  await expect(flip).toHaveAttribute('dir', 'rtl')
  await expect(flip).toContainText('باقة إنترنت الألياف')
  await expect(flip.locator('bdi').filter({ hasText: '+971' })).toBeVisible()
})

test('a gate demo works in Arabic', async ({ page }) => {
  await page.goto('/ar')
  await page.getByRole('button', { name: 'ترقيع في الواجهة الأمامية يخفي خطأ في الواجهة الخلفية' }).click()

  await expect(page.locator('.gate.no')).toContainText('المراجعة البشرية')
  await expect(page.locator('.verdict')).toContainText('يخفي الخطأ الحقيقي')
})
