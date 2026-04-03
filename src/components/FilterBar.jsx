// ============================================
// BEAUTÉ EXPLORER — FilterBar Component
// ============================================

import React, { useState } from 'react'
import { BRANDS, CATEGORIES, SORT_OPTIONS, MAX_PRICE } from '../utils/constants'
import styles from './FilterBar.module.css'

export default function FilterBar({ filters, setBrand, setCategory, setPriceMax, setSortBy, clearFilters, hasActiveFilters, totalCount }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {/* Top row: selects + sort + price */}
        <div className={styles.topRow}>
          <div className={styles.selects}>
            {/* Brand select */}
            <div className={styles.selectWrap}>
              <select
                value={filters.brand}
                onChange={e => setBrand(e.target.value)}
                className={styles.select}
                aria-label="Filter by brand"
              >
                <option value="">All Brands</option>
                {BRANDS.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
              <ChevronIcon />
            </div>

            {/* Sort select */}
            <div className={styles.selectWrap}>
              <select
                value={filters.sortBy}
                onChange={e => setSortBy(e.target.value)}
                className={styles.select}
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </div>

          {/* Price range */}
          <div className={styles.priceWrap}>
            <span className={styles.priceLabel}>
              Max Price: <strong style={{ color: 'var(--petal)' }}>${filters.priceMax}</strong>
            </span>
            <input
              type="range"
              min={5}
              max={MAX_PRICE}
              step={5}
              value={filters.priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className={styles.slider}
              aria-label="Maximum price"
            />
          </div>

          {/* Clear button */}
          {hasActiveFilters && (
            <button onClick={clearFilters} className={styles.clearBtn}>
              Clear All ×
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className={styles.chips}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(filters.category === cat.value ? '' : cat.value)}
              className={`${styles.chip} ${filters.category === cat.value ? styles.chipActive : ''}`}
              aria-pressed={filters.category === cat.value}
            >
              <span className={styles.chipIcon}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg className="chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-light)' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
