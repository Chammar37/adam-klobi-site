import { useState, useEffect } from 'react'
import { fetchMerchItems, urlFor } from '../lib/sanity'
import { quickBuy } from '../lib/shopify'
import './MerchGrid.css'

function MerchGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [buyingId, setBuyingId] = useState(null)

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchMerchItems()
        setItems(data)
      } catch (err) {
        setError('Failed to load merch')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [])

  const handleBuy = async (item) => {
    if (!item.shopifyProductId) {
      console.error('No Shopify product ID for this item')
      return
    }

    setBuyingId(item._id)
    try {
      await quickBuy(item.shopifyProductId)
    } catch (err) {
      console.error('Failed to create checkout:', err)
      setBuyingId(null)
    }
  }

  if (loading) return <div className="merch-loading">Loading merch...</div>
  if (error) return <div className="merch-error">{error}</div>
  if (items.length === 0) return null

  return (
    <div className="merch-grid">
      {items.map((item) => (
        <div key={item._id} className={`merch-card ${item.featured ? 'featured' : ''}`}>
          {item.featured && <span className="featured-badge">Featured</span>}
          <div className="merch-image">
            {item.image && (
              <img
                src={urlFor(item.image).width(400).height(400).url()}
                alt={item.title}
              />
            )}
          </div>
          <div className="merch-info">
            <h3 className="merch-title">{item.title}</h3>
            {item.description && (
              <p className="merch-description">{item.description}</p>
            )}
            <p className="merch-price">${item.price?.toFixed(2)}</p>
            {item.shopifyProductId && (
              <button
                className="buy-button"
                onClick={() => handleBuy(item)}
                disabled={buyingId === item._id}
              >
                {buyingId === item._id ? 'Loading...' : 'Buy Now'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MerchGrid
