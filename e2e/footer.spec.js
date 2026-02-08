import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test('footer is visible on home page', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('.site-footer')
    await expect(footer).toBeVisible()
  })

  test('AK logo is visible', async ({ page }) => {
    await page.goto('/')
    const logo = page.locator('.footer-ak img')
    await expect(logo).toBeVisible()
  })

  test('has 6 social icons', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('.footer-socials a')
    await expect(links).toHaveCount(6)
  })

  test('social links have correct hrefs', async ({ page }) => {
    await page.goto('/')
    const hrefs = await page.locator('.footer-socials a').evaluateAll((els) =>
      els.map((el) => el.href)
    )
    expect(hrefs).toContain('https://open.spotify.com/artist/adamklobi')
    expect(hrefs).toContain('https://music.apple.com/artist/adamklobi')
    expect(hrefs).toContain('https://youtube.com/@adamklobi')
    expect(hrefs).toContain('https://tiktok.com/@adamklobi')
    expect(hrefs).toContain('https://instagram.com/adam.klobi')
    expect(hrefs).toContain('https://wa.me/adamklobi')
  })

  test('social links open in new tab', async ({ page }) => {
    await page.goto('/')
    const targets = await page.locator('.footer-socials a').evaluateAll((els) =>
      els.map((el) => el.target)
    )
    targets.forEach((target) => {
      expect(target).toBe('_blank')
    })
  })

  test('footer is present on music page', async ({ page }) => {
    await page.goto('/music')
    await expect(page.locator('.site-footer')).toBeVisible()
  })

  test('footer is present on about page', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('.site-footer')).toBeVisible()
  })

  test('footer socials use horizontal layout', async ({ page }) => {
    await page.goto('/')
    const display = await page.locator('.footer-socials').evaluate((el) =>
      getComputedStyle(el).display
    )
    expect(display).toBe('flex')
  })
})
