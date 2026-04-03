// ============================================
// BEAUTÉ EXPLORER — EmptyState Component
// ============================================

import React from 'react'
import styles from './EmptyState.module.css'

export default function EmptyState({ hasFilters, onClear, error }) {
  if (error) {
    return (
      <div className={styles.wrap}>
        <div className={styles.icon}>⚠️</div>
        <h3 className={styles.title}>Something went wrong</h3>
        <p className={styles.message}>{error}</p>
        <button className={styles.btn} onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>🌸</div>
      <h3 className={styles.title}>No products found</h3>
      <p className={styles.message}>
        {hasFilters
          ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
          : 'No products are available at the moment. Please try again later.'}
      </p>
      {hasFilters && (
        <button className={styles.btn} onClick={onClear}>
          Clear all filters
        </button>
      )}
    </div>
  )
}
