// ============================================
// BEAUTÉ EXPLORER — useWishlist Custom Hook
// Manages wishlist state with localStorage persistence
// ============================================

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'beaute_wishlist'

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...wishlist]))
    } catch {
      // ignore
    }
  }, [wishlist])

  const toggle = useCallback((id) => {
    setWishlist(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isLiked = useCallback((id) => wishlist.has(id), [wishlist])

  return { wishlist, toggle, isLiked, count: wishlist.size }
}
