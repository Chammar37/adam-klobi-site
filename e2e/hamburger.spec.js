import { test, expect } from '@playwright/test'

// Hamburger visibility rules:
// - Only appears at ≤816px (the single mobile breakpoint)
// - NEVER appears on the home page at any viewport
// - Appears on all other pages at ≤816px

const NON_HOME_PAGES = ['/music', '/merch', '/tour', '/videos', '/about']

test.describe('Hamburger visibility', () => {
  test.describe('desktop (>816px)', () => {
    test('hamburger is hidden on home page', async ({ page, viewport }) => {
      test.skip(viewport.width <= 816, 'Test targets desktop viewports')
      await page.goto('/')
      const hamburger = page.locator('.hamburger')
      await expect(hamburger).toBeHidden()
    })

    for (const route of NON_HOME_PAGES) {
      test(`hamburger is hidden on ${route}`, async ({ page, viewport }) => {
        test.skip(viewport.width <= 816, 'Test targets desktop viewports')
        await page.goto(route)
        const hamburger = page.locator('.hamburger')
        await expect(hamburger).toBeHidden()
      })
    }
  })

  test.describe('mobile (≤816px)', () => {
    test('hamburger is never visible on home page', async ({ page, viewport }) => {
      test.skip(viewport.width > 816, 'Test targets mobile viewports')
      await page.goto('/')
      const hamburger = page.locator('.hamburger')
      await expect(hamburger).toBeHidden()
    })

    for (const route of NON_HOME_PAGES) {
      test(`hamburger is visible on ${route}`, async ({ page, viewport }) => {
        test.skip(viewport.width > 816, 'Test targets mobile viewports')
        await page.goto(route)
        const hamburger = page.locator('.hamburger')
        await expect(hamburger).toBeVisible()
      })
    }
  })

  test.describe('nav links inverse of hamburger', () => {
    test('home page shows nav links on desktop', async ({ page, viewport }) => {
      test.skip(viewport.width <= 816, 'Test targets desktop viewports')
      await page.goto('/')
      const navLinks = page.locator('.nav-links')
      await expect(navLinks).toBeVisible()
    })

    test('home page shows nav links at ≤816px (no hamburger fallback)', async ({ page, viewport }) => {
      test.skip(viewport.width > 816, 'Test targets mobile viewports')
      test.skip(viewport.width <= 768, 'Home nav hidden entirely at ≤768px')
      await page.goto('/')
      const navLinks = page.locator('.nav-menu--home .nav-links')
      await expect(navLinks).toBeVisible()
      const hamburger = page.locator('.hamburger')
      await expect(hamburger).toBeHidden()
    })

    for (const route of NON_HOME_PAGES) {
      test(`nav links hidden when hamburger shown on ${route}`, async ({ page, viewport }) => {
        test.skip(viewport.width > 816, 'Test targets mobile viewports')
        await page.goto(route)
        const navLinks = page.locator('.nav-links')
        await expect(navLinks).toBeHidden()
        const hamburger = page.locator('.hamburger')
        await expect(hamburger).toBeVisible()
      })
    }
  })

  test.describe('single breakpoint enforcement', () => {
    test('hamburger display changes exactly at 816px boundary', async ({ page }) => {
      await page.goto('/music')

      // Above breakpoint — hidden
      await page.setViewportSize({ width: 817, height: 900 })
      const hamburger = page.locator('.hamburger')
      await expect(hamburger).toBeHidden()

      // At breakpoint — visible
      await page.setViewportSize({ width: 816, height: 900 })
      await expect(hamburger).toBeVisible()
    })

    test('home page hamburger stays hidden across breakpoint', async ({ page }) => {
      await page.goto('/')

      const hamburger = page.locator('.hamburger')

      // Above breakpoint
      await page.setViewportSize({ width: 817, height: 900 })
      await expect(hamburger).toBeHidden()

      // At breakpoint — still hidden on home
      await page.setViewportSize({ width: 816, height: 900 })
      await expect(hamburger).toBeHidden()

      // Well below breakpoint — still hidden on home
      await page.setViewportSize({ width: 375, height: 812 })
      await expect(hamburger).toBeHidden()
    })
  })
})
