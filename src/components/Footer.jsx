// ============================================
// BEAUTÉ EXPLORER — Footer Component
// ============================================

import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoName}>beauté explorer</span>
        </div>
        <p className={styles.copy}>
          Powered by{' '}
          <a href="http://makeup-api.herokuapp.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Makeup API
          </a>
          {' '}· Built with React + Vite 🌸
        </p>
        <p className={styles.note}>
          A portfolio project showcasing API integration, custom hooks, and modern UI/UX.
        </p>
      </div>
    </footer>
  )
}
