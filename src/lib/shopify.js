import Client from 'shopify-buy'

export const shopifyClient = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_TOKEN
})

// Create a checkout and add items
export const createCheckout = async () => {
  return shopifyClient.checkout.create()
}

// Add item to checkout
export const addToCheckout = async (checkoutId, variantId, quantity = 1) => {
  const lineItemsToAdd = [{ variantId, quantity }]
  return shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd)
}

// Get a product by ID
export const getProduct = async (productId) => {
  return shopifyClient.product.fetch(productId)
}

// Quick buy - creates checkout and redirects
export const quickBuy = async (variantId, quantity = 1) => {
  const checkout = await shopifyClient.checkout.create()
  await shopifyClient.checkout.addLineItems(checkout.id, [
    { variantId, quantity }
  ])
  window.location.href = checkout.webUrl
}
