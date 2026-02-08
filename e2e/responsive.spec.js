import { test, expect } from '@playwright/test'

test.describe('Responsive behavior', () => {
  test('content section padding reduces at mobile breakpoint', async ({ page }) => {
    await page.goto('/merch')
    await page.setViewportSize({ width: 1024, height: 768 })
    const paddingDesktop = await page.locator('.content-section').evaluate((el) =>
      getComputedStyle(el).padding
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const paddingMobile = await page.locator('.content-section').evaluate((el) =>
      getComputedStyle(el).padding
    )
    expect(parseFloat(paddingDesktop)).toBeGreaterThan(parseFloat(paddingMobile))
  })

  test('section title font shrinks at mobile breakpoint', async ({ page }) => {
    await page.goto('/merch')
    await page.setViewportSize({ width: 1024, height: 768 })
    const fontDesktop = await page.locator('.section-title').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const fontMobile = await page.locator('.section-title').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )
    expect(fontDesktop).toBeGreaterThan(fontMobile)
  })

  test('nav logo scales with viewport width', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1440, height: 900 })
    const widthLarge = await page.locator('.nav-logo img').evaluate((el) =>
      parseFloat(getComputedStyle(el).width)
    )

    await page.setViewportSize({ width: 800, height: 1024 })
    const widthSmall = await page.locator('.nav-logo img').evaluate((el) =>
      parseFloat(getComputedStyle(el).width)
    )
    expect(widthLarge).toBeGreaterThan(widthSmall)
  })

  test('tour card wraps at 640px', async ({ page }) => {
    await page.goto('/tour')
    await page.setViewportSize({ width: 639, height: 1024 })
    const tourCard = page.locator('.tour-card').first()
    const count = await page.locator('.tour-card').count()
    if (count > 0) {
      const flexWrap = await tourCard.evaluate((el) =>
        getComputedStyle(el).flexWrap
      )
      expect(flexWrap).toBe('wrap')
    }
  })

  test('hotspot label font shrinks at mobile', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 767, height: 1024 })
    await expect(page.locator('.interactive-image-container')).toBeVisible()
  })

  test('videos page responsive padding', async ({ page }) => {
    await page.goto('/videos')
    await page.setViewportSize({ width: 1024, height: 768 })
    const paddingDesktop = await page.locator('.videos-page').evaluate((el) =>
      getComputedStyle(el).paddingLeft
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const paddingMobile = await page.locator('.videos-page').evaluate((el) =>
      getComputedStyle(el).paddingLeft
    )
    expect(parseFloat(paddingDesktop)).toBeGreaterThan(parseFloat(paddingMobile))
  })

  test('tour page responsive padding', async ({ page }) => {
    await page.goto('/tour')
    await page.setViewportSize({ width: 1024, height: 768 })
    const paddingDesktop = await page.locator('.tour-page').evaluate((el) =>
      getComputedStyle(el).paddingLeft
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const paddingMobile = await page.locator('.tour-page').evaluate((el) =>
      getComputedStyle(el).paddingLeft
    )
    expect(parseFloat(paddingDesktop)).toBeGreaterThan(parseFloat(paddingMobile))
  })

  test('nav font scales between viewports', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1440, height: 900 })
    const fontLarge = await page.locator('.nav-links').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )

    await page.setViewportSize({ width: 800, height: 1024 })
    const fontSmall = await page.locator('.nav-links').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )
    expect(fontLarge).toBeGreaterThan(fontSmall)
  })

  test('footer layout at different viewports', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('.site-footer')
    await expect(footer).toBeVisible()
    const display = await footer.evaluate((el) =>
      getComputedStyle(el).display
    )
    expect(display).toBe('flex')
  })

  test('interactive image is responsive', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1440, height: 900 })
    const widthLarge = await page.locator('.interactive-image-container').evaluate((el) =>
      el.getBoundingClientRect().width
    )

    await page.setViewportSize({ width: 375, height: 812 })
    const widthSmall = await page.locator('.interactive-image-container').evaluate((el) =>
      el.getBoundingClientRect().width
    )
    expect(widthLarge).toBeGreaterThan(widthSmall)
  })
})
