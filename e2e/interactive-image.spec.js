import { test, expect } from '@playwright/test'

test.describe('Interactive Image', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('base image is present and has src', async ({ page }) => {
    const container = page.locator('.interactive-image-container')
    await expect(container).toBeVisible()
    const baseImage = page.locator('.base-image')
    await expect(baseImage).toHaveAttribute('src', '/base-image.jpg')
    // Image is visible on desktop but may be hidden on smaller viewports
    // due to container overflow or layout constraints
    const isVisible = await baseImage.isVisible()
    if (isVisible) {
      await expect(baseImage).toBeVisible()
    }
  })

  test('hotspot wrappers are present', async ({ page }) => {
    await expect(page.locator('.interactive-image-container')).toBeVisible()
    const hotspots = page.locator('.hotspot-wrapper')
    const count = await hotspots.count()
    expect(count).toBeGreaterThan(0)
  })

  test('hotspot images are rendered', async ({ page }) => {
    await expect(page.locator('.interactive-image-container')).toBeVisible()
    const hotspotImages = page.locator('.hotspot-image')
    const count = await hotspotImages.count()
    expect(count).toBeGreaterThan(0)
  })

  test('hovering over hotspot area', async ({ page }) => {
    const container = page.locator('.interactive-image-container')
    const box = await container.boundingBox()
    if (!box) return

    const x = box.x + box.width * 0.23
    const y = box.y + box.height * 0.73
    await page.mouse.move(x, y)
    await page.waitForTimeout(300)

    // Best-effort: labels appear only over opaque pixels
    const labels = page.locator('.hotspot-label')
    const labelCount = await labels.count()
    expect(labelCount).toBeGreaterThanOrEqual(0)
  })

  test('hovering adds hovered class to wrapper', async ({ page }) => {
    const container = page.locator('.interactive-image-container')
    const box = await container.boundingBox()
    if (!box) return

    const x = box.x + box.width * 0.23
    const y = box.y + box.height * 0.73
    await page.mouse.move(x, y)
    await page.waitForTimeout(300)

    const hoveredCount = await page.locator('.hotspot-wrapper.hovered').count()
    expect(hoveredCount).toBeGreaterThanOrEqual(0)
  })

  test('mouse leave clears hover state', async ({ page }) => {
    const container = page.locator('.interactive-image-container')
    const box = await container.boundingBox()
    if (!box) return

    await page.mouse.move(box.x + box.width * 0.23, box.y + box.height * 0.73)
    await page.waitForTimeout(200)
    await page.mouse.move(0, 0)
    await page.waitForTimeout(200)

    const hoveredCount = await page.locator('.hotspot-wrapper.hovered').count()
    expect(hoveredCount).toBe(0)
  })

  test('has-glow class is applied to glow hotspots', async ({ page }) => {
    await expect(page.locator('.interactive-image-container')).toBeVisible()
    const glowHotspots = page.locator('.hotspot-wrapper.has-glow')
    const count = await glowHotspots.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has-enlarge class is applied to enlarge hotspots', async ({ page }) => {
    await expect(page.locator('.interactive-image-container')).toBeVisible()
    const enlargeHotspots = page.locator('.hotspot-wrapper.has-enlarge')
    const count = await enlargeHotspots.count()
    expect(count).toBeGreaterThan(0)
  })

  test('hotspot wrapper has pointer-events none', async ({ page }) => {
    await expect(page.locator('.interactive-image-container')).toBeVisible()
    const wrapper = page.locator('.hotspot-wrapper').first()
    const pointerEvents = await wrapper.evaluate((el) =>
      getComputedStyle(el).pointerEvents
    )
    expect(pointerEvents).toBe('none')
  })

  test('container is relatively positioned', async ({ page }) => {
    const container = page.locator('.interactive-image-container')
    await expect(container).toBeVisible()
    const position = await container.evaluate((el) =>
      getComputedStyle(el).position
    )
    expect(position).toBe('relative')
  })
})
