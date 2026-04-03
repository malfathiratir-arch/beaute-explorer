// ============================================
// BEAUTÉ EXPLORER — useProducts Custom Hook
// Handles: fetching, filtering, sorting, pagination
// ============================================

import { useState, useEffect, useMemo, useCallback } from 'react'
import { API_BASE, PER_PAGE, MAX_PRICE } from '../utils/constants'
import { filterProducts, sortProducts } from '../utils/helpers'

const initialFilters = {
  search: '',
  brand: '',
  category: '',
  priceMax: MAX_PRICE,
  sortBy: 'default',
}

export function useProducts() {
  // Raw API data
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter state
  const [filters, setFilters] = useState(initialFilters)

  // Pagination
  const [page, setPage] = useState(1)

  // Build API URL based on brand + category (server-side filter)
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (filters.brand) params.set('brand', filters.brand)
    if (filters.category) params.set('product_type', filters.category)
    const qs = params.toString()
    return `${API_BASE}${qs ? '?' + qs : ''}`
  }, [filters.brand, filters.category])

  // Fetch products when API URL changes
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    setPage(1)

    fetch(apiUrl, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Invalid data format')
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError('Unable to load products. Please check your connection.')
        setLoading(false)
      })

    return () => controller.abort()
  }, [apiUrl])

  // Client-side filter + sort (search, price)
  const processedProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      search: filters.search,
      priceMax: filters.priceMax,
    })
    return sortProducts(filtered, filters.sortBy)
  }, [products, filters.search, filters.priceMax, filters.sortBy])

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return processedProducts.slice(start, start + PER_PAGE)
  }, [processedProducts, page])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [filters.search, filters.priceMax, filters.sortBy])

  // Filter setters
  const setSearch = useCallback(val => setFilters(f => ({ ...f, search: val })), [])
  const setBrand = useCallback(val => setFilters(f => ({ ...f, brand: val })), [])
  const setCategory = useCallback(val => setFilters(f => ({ ...f, category: val })), [])
  const setPriceMax = useCallback(val => setFilters(f => ({ ...f, priceMax: val })), [])
  const setSortBy = useCallback(val => setFilters(f => ({ ...f, sortBy: val })), [])
  const clearFilters = useCallback(() => setFilters(initialFilters), [])

  const hasActiveFilters = filters.search || filters.brand || filters.category || filters.priceMax < MAX_PRICE

  return {
    // Data
    products: paginatedProducts,
    totalCount: processedProducts.length,
    loading,
    error,

    // Filters
    filters,
    setSearch,
    setBrand,
    setCategory,
    setPriceMax,
    setSortBy,
    clearFilters,
    hasActiveFilters,

    // Pagination
    page,
    setPage,
    totalPages,
  }
}
