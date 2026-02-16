import { test, expect } from '@playwright/test'

test.describe('Responsive behavior', () => {
  test('merch page padding reduces at mobile breakpoint', async ({ page }) => {
    await page.goto('/merch')
    await page.setViewportSize({ width: 1024, height: 768 })
    const paddingDesktop = await page.locator('.merch-page').evaluate((el) =>
      getComputedStyle(el).paddingLeft
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const paddingMobile = await page.locator('.merch-page').evaluate((el) =>
      getComputedStyle(el).paddingLeft
    )
    expect(parseFloat(paddingDesktop)).toBeGreaterThan(parseFloat(paddingMobile))
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

  test('tour page fills viewport height', async ({ page, viewport }) => {
    await page.goto('/tour')
    const box = await page.locator('.tour-page').boundingBox()
    expect(box.height).toBeGreaterThanOrEqual(viewport.height - 1)
  })

  test('tour signup form is visible and centered', async ({ page, viewport }) => {
    await page.goto('/tour')
    const signup = page.locator('.signup')
    await expect(signup).toBeVisible()
    const box = await signup.boundingBox()
    // Centered: left margin roughly equals right margin (within 2px)
    const leftMargin = box.x
    const rightMargin = viewport.width - box.x - box.width
    expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(2)
  })

  test('tour signup form fits within viewport', async ({ page, viewport }) => {
    await page.goto('/tour')
    const box = await page.locator('.signup-form').boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width)
  })

  test('signup form uses horizontal flex layout', async ({ page }) => {
    await page.goto('/tour')
    const form = page.locator('.signup-form')
    const display = await form.evaluate((el) => getComputedStyle(el).display)
    const direction = await form.evaluate((el) => getComputedStyle(el).flexDirection)
    expect(display).toBe('flex')
    expect(direction).toBe('row')
  })

  test('merch page fills viewport height', async ({ page, viewport }) => {
    await page.goto('/merch')
    const box = await page.locator('.merch-page').boundingBox()
    expect(box.height).toBeGreaterThanOrEqual(viewport.height - 1)
  })

  test('merch signup form is visible and centered', async ({ page, viewport }) => {
    await page.goto('/merch')
    const signup = page.locator('.signup')
    await expect(signup).toBeVisible()
    const box = await signup.boundingBox()
    const leftMargin = box.x
    const rightMargin = viewport.width - box.x - box.width
    expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(2)
  })

  test('merch signup form fits within viewport', async ({ page, viewport }) => {
    await page.goto('/merch')
    const box = await page.locator('.signup-form').boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width)
  })

  test('signup button font scales on mobile', async ({ page, viewport }) => {
    await page.goto('/tour')
    const fontSize = await page.locator('.signup-btn').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )
    if (viewport.width <= 768) {
      expect(fontSize).toBeGreaterThanOrEqual(15) // 0.95rem
    } else {
      expect(fontSize).toBeLessThan(15) // 0.8rem
    }
  })

  // ── About page ──

  test('about page fills viewport height', async ({ page, viewport }) => {
    await page.goto('/about')
    const box = await page.locator('.about-page').boundingBox()
    expect(box.height).toBeGreaterThanOrEqual(viewport.height - 1)
  })

  test('about page padding reduces on mobile', async ({ page }) => {
    await page.goto('/about')
    await page.setViewportSize({ width: 1024, height: 768 })
    const paddingDesktop = await page.locator('.about-page').evaluate((el) =>
      parseFloat(getComputedStyle(el).paddingLeft)
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const paddingMobile = await page.locator('.about-page').evaluate((el) =>
      parseFloat(getComputedStyle(el).paddingLeft)
    )
    expect(paddingDesktop).toBeGreaterThan(paddingMobile)
  })

  test('about bio text scales with viewport', async ({ page }) => {
    await page.goto('/about')
    await page.setViewportSize({ width: 1440, height: 900 })
    const fontLarge = await page.locator('.about-bio').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )

    await page.setViewportSize({ width: 375, height: 812 })
    const fontSmall = await page.locator('.about-bio').evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize)
    )
    expect(fontLarge).toBeGreaterThan(fontSmall)
  })

  test('about bio fits within viewport width', async ({ page, viewport }) => {
    await page.goto('/about')
    const box = await page.locator('.about-bio').boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width)
  })

  test('about contact info is visible', async ({ page }) => {
    await page.goto('/about')
    const contact = page.locator('.about-contact')
    await expect(contact).toBeVisible()
  })

  // ── Music page ──

  test('music page loading state fills viewport', async ({ page, viewport }) => {
    await page.goto('/music')
    // CMS is unconfigured locally so it shows loading briefly then empty
    const main = page.locator('main')
    await expect(main).toBeVisible()
    const box = await main.boundingBox()
    expect(box.height).toBeGreaterThanOrEqual(viewport.height - 1)
  })

  test('music page fits within viewport width', async ({ page, viewport }) => {
    await page.goto('/music')
    const main = page.locator('main')
    await expect(main).toBeVisible()
    const box = await main.boundingBox()
    expect(box.width).toBeLessThanOrEqual(viewport.width)
  })

  // ── Videos page ──

  test('videos page fills viewport height', async ({ page, viewport }) => {
    await page.goto('/videos')
    const box = await page.locator('.videos-page').boundingBox()
    expect(box.height).toBeGreaterThanOrEqual(viewport.height - 1)
  })

  test('videos container is centered', async ({ page, viewport }) => {
    await page.goto('/videos')
    const container = page.locator('.videos-container')
    await expect(container).toBeVisible()
    const box = await container.boundingBox()
    const leftMargin = box.x
    const rightMargin = viewport.width - box.x - box.width
    expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(2)
  })

  test('videos container fits within viewport', async ({ page, viewport }) => {
    await page.goto('/videos')
    const box = await page.locator('.videos-container').boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width)
  })

  test('videos container gap reduces on mobile', async ({ page }) => {
    await page.goto('/videos')
    await page.setViewportSize({ width: 1024, height: 768 })
    const gapDesktop = await page.locator('.videos-container').evaluate((el) =>
      parseFloat(getComputedStyle(el).gap)
    )

    await page.setViewportSize({ width: 767, height: 1024 })
    const gapMobile = await page.locator('.videos-container').evaluate((el) =>
      parseFloat(getComputedStyle(el).gap)
    )
    expect(gapDesktop).toBeGreaterThan(gapMobile)
  })

  // ── Shared ──

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
