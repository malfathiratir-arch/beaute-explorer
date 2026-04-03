// ============================================
// BEAUTÉ EXPLORER — SkeletonCard Component
// ============================================

import React from 'react'
import styles from './SkeletonCard.module.css'

export default function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.imageWrap}>
        <div className={`${styles.shimmer} ${styles.image}`} />
      </div>
      <div className={styles.content}>
        <div className={`${styles.shimmer} ${styles.lineSm}`} style={{ width: '45%' }} />
        <div className={`${styles.shimmer} ${styles.lineMd}`} style={{ width: '85%' }} />
        <div className={`${styles.shimmer} ${styles.lineMd}`} style={{ width: '65%' }} />
        <div className={styles.metaRow}>
          <div className={`${styles.shimmer} ${styles.lineSm}`} style={{ width: '60%' }} />
          <div className={`${styles.shimmer} ${styles.lineSm}`} style={{ width: '20%' }} />
        </div>
        <div className={styles.dotsRow}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${styles.shimmer} ${styles.dot}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
