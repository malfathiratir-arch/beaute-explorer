// ============================================
// BEAUTÉ EXPLORER — Helper Utilities
// ============================================

/**
 * Format price to display string
 */
export function formatPrice(price) {
  const p = parseFloat(price)
  if (!p || isNaN(p) || p === 0) return null
  return `$${p.toFixed(2)}`
}

/**
 * Parse numeric price
 */
export function parsePrice(price) {
  return parseFloat(price) || 0
}

/**
 * Strip HTML tags from description
 */
export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim()
}

/**
 * Truncate text to maxLength
 */
export function truncate(text, maxLength = 160) {
  if (!text) return ''
  const clean = stripHtml(text)
  if (clean.length <= maxLength) return clean
  return clean.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(str) {
  if (!str) return ''
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Sort products by sortBy key
 */
export function sortProducts(products, sortBy) {
  const arr = [...products]
  switch (sortBy) {
    case 'price_asc':
      return arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    case 'price_desc':
      return arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    case 'rating_desc':
      return arr.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0))
    case 'name_asc':
      return arr.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    default:
      return arr
  }
}

/**
 * Filter products by current filter state
 */
export function filterProducts(products, { search, priceMax }) {
  return products.filter(p => {
    // Search filter
    if (search) {
      const q = search.toLowerCase()
      const nameMatch = p.name?.toLowerCase().includes(q)
      const brandMatch = p.brand?.toLowerCase().includes(q)
      const descMatch = p.description?.toLowerCase().includes(q)
      if (!nameMatch && !brandMatch && !descMatch) return false
    }

    // Price filter
    const price = parsePrice(p.price)
    if (price > 0 && price > priceMax) return false

    return true
  })
}

/**
 * Generate staggered animation delay
 */
export function staggerDelay(index, base = 40) {
  return `${(index % 12) * base}ms`
}

/**
 * Clamp number between min and max
 */
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}
