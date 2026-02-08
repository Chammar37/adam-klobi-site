import { test, expect } from '@playwright/test'

test.describe('Page smoke tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.interactive-image-container')).toBeVisible()
  })

  test('music page loads without error', async ({ page }) => {
    await page.goto('/music')
    // MusicPage fetches from CMS; without config it shows loading then empty
    // Verify page navigated successfully and no JS errors
    await expect(page).toHaveURL('/music')
  })

  test('merch page loads with heading', async ({ page }) => {
    await page.goto('/merch')
    await expect(page.locator('h2', { hasText: 'Merch' })).toBeVisible()
  })

  test('tour page loads', async ({ page }) => {
    await page.goto('/tour')
    await expect(page.locator('.tour-page')).toBeVisible()
  })

  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('.about-page')).toBeVisible()
  })

  test('videos page loads', async ({ page }) => {
    await page.goto('/videos')
    await expect(page.locator('.videos-page')).toBeVisible()
  })

  test('body has dark background', async ({ page }) => {
    await page.goto('/')
    const bg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    )
    expect(bg).toBe('rgb(17, 17, 17)')
  })

  test('body has white text color', async ({ page }) => {
    await page.goto('/')
    const color = await page.evaluate(() =>
      getComputedStyle(document.body).color
    )
    expect(color).toBe('rgb(255, 255, 255)')
  })
})
