// ============================================
// BEAUTÉ EXPLORER — Hero Component
// ============================================

import React from 'react'
import styles from './Hero.module.css'

const MARQUEE_ITEMS = [
  '✦ Lipstick', '✦ Foundation', '✦ Eyeshadow', '✦ Blush',
  '✦ Mascara', '✦ Eyeliner', '✦ Nail Polish', '✦ Bronzer',
  '✦ Lip Liner', '✦ Concealer', '✦ Highlighter', '✦ Primer',
]

export default function Hero({ totalCount }) {
  return (
    <section className={styles.hero}>
      {/* Decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <div className={styles.inner}>
        <div className={`${styles.pill} fade-up`} style={{ animationDelay: '0ms' }}>
          ✦ Discover Your Glow
        </div>

        <h1 className={`${styles.heading} fade-up`} style={{ animationDelay: '60ms' }}>
          Beauty,{' '}
          <em className={styles.headingAccent}>Curated</em>
          <br />
          <span className={styles.headingSub}>for You</span>
        </h1>

        <p className={`${styles.sub} fade-up`} style={{ animationDelay: '120ms' }}>
          Explore {totalCount > 0 ? <strong>{totalCount.toLocaleString()}+</strong> : 'hundreds of'} makeup products
          from top brands — all in one elegant space.
        </p>

        <div className={`${styles.stats} fade-up`} style={{ animationDelay: '180ms' }}>
          <StatPill icon="💄" label="Lipsticks & Liners" />
          <StatPill icon="🌸" label="Blush & Bronzer" />
          <StatPill icon="👁️" label="Eyes & Brows" />
          <StatPill icon="🫙" label="Foundation" />
        </div>
      </div>

      {/* Marquee */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatPill({ icon, label }) {
  return (
    <div className={styles.statPill}>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}
