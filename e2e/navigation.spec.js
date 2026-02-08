import { test, expect } from '@playwright/test'

// Nav is hidden at <=768px via CSS media query, so navigation tests
// check visibility first and skip assertions when nav is hidden
test.describe('Navigation', () => {
  test('logo is visible on desktop', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    const logo = page.locator('.nav-logo img')
    await expect(logo).toBeVisible()
  })

  test('Home is bold on / route', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    const homeLink = page.locator('.nav-links a', { hasText: 'Home' })
    await expect(homeLink).toHaveClass(/active/)
    const fontWeight = await homeLink.evaluate((el) =>
      getComputedStyle(el).fontWeight
    )
    expect(fontWeight).toBe('700')
  })

  test('clicking Music navigates to /music and bolds Music', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    await page.locator('.nav-links a', { hasText: 'Music' }).click()
    await expect(page).toHaveURL('/music')
    const musicLink = page.locator('.nav-links a', { hasText: 'Music' })
    await expect(musicLink).toHaveClass(/active/)
    const fontWeight = await musicLink.evaluate((el) =>
      getComputedStyle(el).fontWeight
    )
    expect(fontWeight).toBe('700')
    const homeLink = page.locator('.nav-links a', { hasText: 'Home' })
    await expect(homeLink).not.toHaveClass(/active/)
  })

  test('clicking Merch navigates to /merch and bolds Merch', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    await page.locator('.nav-links a', { hasText: 'Merch' }).click()
    await expect(page).toHaveURL('/merch')
    const merchLink = page.locator('.nav-links a', { hasText: 'Merch' })
    await expect(merchLink).toHaveClass(/active/)
  })

  test('clicking Tour navigates to /tour and bolds Tour', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    await page.locator('.nav-links a', { hasText: 'Tour' }).click()
    await expect(page).toHaveURL('/tour')
    const tourLink = page.locator('.nav-links a', { hasText: 'Tour' })
    await expect(tourLink).toHaveClass(/active/)
  })

  test('clicking About navigates to /about and bolds About', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    await page.locator('.nav-links a', { hasText: 'About' }).click()
    await expect(page).toHaveURL('/about')
    const aboutLink = page.locator('.nav-links a', { hasText: 'About' })
    await expect(aboutLink).toHaveClass(/active/)
  })

  test('clicking Videos navigates to /videos and bolds Videos', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    await page.locator('.nav-links a', { hasText: 'Videos' }).click()
    await expect(page).toHaveURL('/videos')
    const videosLink = page.locator('.nav-links a', { hasText: 'Videos' })
    await expect(videosLink).toHaveClass(/active/)
  })

  test('nav is absolutely positioned with z-index 1000', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    const nav = page.locator('.nav-menu')
    const position = await nav.evaluate((el) => getComputedStyle(el).position)
    expect(position).toBe('absolute')
    const zIndex = await nav.evaluate((el) => getComputedStyle(el).zIndex)
    expect(zIndex).toBe('1000')
  })

  test('nav font uses vw-based sizing', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    const navLinks = page.locator('.nav-links')
    const fontSize = await navLinks.evaluate((el) => getComputedStyle(el).fontSize)
    const size = parseFloat(fontSize)
    expect(size).toBeGreaterThan(0)
    expect(size).toBeLessThan(20)
  })

  test('full navigation flow across all pages', async ({ page, viewport }) => {
    test.skip(viewport.width <= 768, 'Nav hidden on small viewports')
    await page.goto('/')
    await page.locator('.nav-links a', { hasText: 'Music' }).click()
    await expect(page).toHaveURL('/music')
    await page.locator('.nav-links a', { hasText: 'Tour' }).click()
    await expect(page).toHaveURL('/tour')
    await page.locator('.nav-links a', { hasText: 'Merch' }).click()
    await expect(page).toHaveURL('/merch')
    await page.locator('.nav-links a', { hasText: 'About' }).click()
    await expect(page).toHaveURL('/about')
    await page.locator('.nav-links a', { hasText: 'Videos' }).click()
    await expect(page).toHaveURL('/videos')
    await page.locator('.nav-links a', { hasText: 'Home' }).click()
    await expect(page).toHaveURL('/')
  })
})
