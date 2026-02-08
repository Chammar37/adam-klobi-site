import { vi } from 'vitest'

export const mockQuickBuy = vi.fn()

export const mockShopifyClient = {
  checkout: {
    create: vi.fn(),
    addLineItems: vi.fn(),
  },
  product: {
    fetch: vi.fn(),
  },
}
