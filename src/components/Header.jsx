// ============================================
// BEAUTÉ EXPLORER — Header Component
// ============================================

import React from 'react'
import styles from './Header.module.css'

export default function Header({ search, onSearch, wishlistCount, totalCount, loading }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoMark}>✦</span>
          <div>
            <div className={styles.logoName}>beauté</div>
            <div className={styles.logoSub}>product explorer</div>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search products, brands…"
            className={styles.searchInput}
            aria-label="Search products"
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearch('')} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        {/* Right info */}
        <div className={styles.meta}>
          {!loading && (
            <div className={styles.count}>
              <span className={styles.countNum}>{totalCount.toLocaleString()}</span>
              <span className={styles.countLabel}> products</span>
            </div>
          )}
          {wishlistCount > 0 && (
            <div className={styles.wishBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistCount}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
