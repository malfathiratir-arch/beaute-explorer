// ============================================
// BEAUTÉ EXPLORER — App Root Component
// ============================================

import React, { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import SkeletonCard from './components/SkeletonCard'
import Pagination from './components/Pagination'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import { useProducts } from './hooks/useProducts'
import { useWishlist } from './hooks/useWishlist'
import { PER_PAGE } from './utils/constants'

export default function App() {
  const {
    products,
    totalCount,
    loading,
    error,
    filters,
    setSearch,
    setBrand,
    setCategory,
    setPriceMax,
    setSortBy,
    clearFilters,
    hasActiveFilters,
    page,
    setPage,
    totalPages,
  } = useProducts()

  const { toggle: toggleLike, isLiked, count: wishlistCount } = useWishlist()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setPage])

  const showEmpty = !loading && !error && products.length === 0
  const showError = !loading && error && products.length === 0

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header */}
      <Header
        search={filters.search}
        onSearch={setSearch}
        wishlistCount={wishlistCount}
        totalCount={totalCount}
        loading={loading}
      />

      {/* Hero */}
      <Hero totalCount={totalCount} />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        setBrand={setBrand}
        setCategory={setCategory}
        setPriceMax={setPriceMax}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        totalCount={totalCount}
      />

      {/* Main content */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: '40px 28px 0' }}>

          {/* Results info bar */}
          {!loading && !showEmpty && !showError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 8,
            }}>
              <p style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 300 }}>
                Showing{' '}
                <strong style={{ color: 'var(--text-mid)', fontWeight: 500 }}>
                  {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, totalCount)}
                </strong>
                {' '}of{' '}
                <strong style={{ color: 'var(--petal)', fontWeight: 600 }}>
                  {totalCount.toLocaleString()}
                </strong>
                {' '}products
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 12,
                    color: 'var(--petal)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontFamily: 'var(--font-body)',
                    padding: 0,
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Skeleton loading */}
          {loading && (
            <div className="product-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty / Error state */}
          {(showEmpty || showError) && (
            <EmptyState
              hasFilters={hasActiveFilters}
              onClear={clearFilters}
              error={showError ? error : null}
            />
          )}

          {/* Product grid */}
          {!loading && products.length > 0 && (
            <div className="product-grid">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectProduct}
                  isLiked={isLiked(product.id)}
                  onToggleLike={toggleLike}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          isLiked={isLiked(selectedProduct.id)}
          onToggleLike={toggleLike}
        />
      )}
    </div>
  )
}
