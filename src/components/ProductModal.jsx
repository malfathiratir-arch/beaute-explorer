// ============================================
// BEAUTÉ EXPLORER — ProductModal Component
// ============================================

import React, { useState, useEffect } from 'react'
import StarRating from './StarRating'
import { formatPrice, truncate, titleCase } from '../utils/helpers'
import { CATEGORIES } from '../utils/constants'
import styles from './ProductModal.module.css'

function getCategoryInfo(type) {
  return CATEGORIES.find(c => c.value === type) || { label: titleCase(type?.replace(/_/g, ' ') || ''), icon: '✨' }
}

export default function ProductModal({ product, onClose, isLiked, onToggleLike }) {
  const [imgErr, setImgErr] = useState(false)
  const [activeColorIdx, setActiveColorIdx] = useState(0)

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const price = formatPrice(product.price)
  const colors = product.product_colors || []
  const catInfo = getCategoryInfo(product.product_type)
  const description = truncate(product.description, 320)
  const tags = [
    product.product_type && catInfo.label,
    product.category,
    ...(product.tag_list?.slice(0, 4) || []),
  ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i)

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={product.name}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={styles.layout}>
          {/* Left: Image */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrap}>
              {!imgErr && product.image_link ? (
                <img src={product.image_link} alt={product.name} className={styles.image} onError={() => setImgErr(true)} />
              ) : (
                <div className={styles.imageFallback}>
                  <span style={{ fontSize: 80 }}>{catInfo.icon}</span>
                </div>
              )}
            </div>
            {/* Color preview stripe */}
            {colors.length > 0 && (
              <div className={styles.colorStripe}>
                {colors.slice(0, 12).map((c, i) => (
                  <button
                    key={i}
                    className={`${styles.colorBtn} ${i === activeColorIdx ? styles.colorBtnActive : ''}`}
                    style={{ background: c.hex_value || '#ccc' }}
                    onClick={() => setActiveColorIdx(i)}
                    title={c.colour_name}
                    aria-label={c.colour_name}
                  />
                ))}
              </div>
            )}
            {colors[activeColorIdx] && (
              <div className={styles.shadeName}>
                {catInfo.icon} <em>{colors[activeColorIdx].colour_name}</em>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className={styles.infoCol}>
            {/* Brand + category */}
            <div className={styles.topMeta}>
              <span className={styles.brandLabel}>{titleCase(product.brand || 'Unknown Brand')}</span>
              <span className={styles.catChip}>{catInfo.icon} {catInfo.label}</span>
            </div>

            <h2 className={styles.name}>{product.name}</h2>

            {/* Rating */}
            {product.rating && (
              <div className={styles.ratingRow}>
                <StarRating rating={product.rating} size={18} showNumber />
                {colors.length > 0 && (
                  <span className={styles.shadeCount}>{colors.length} shades available</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className={styles.priceRow}>
              <span className={styles.price}>{price || 'Price unavailable'}</span>
              <button
                className={`${styles.likeBtn} ${isLiked ? styles.likeBtnActive : ''}`}
                onClick={() => onToggleLike(product.id)}
                aria-pressed={isLiked}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {isLiked ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Description */}
            {description && (
              <div className={styles.descBlock}>
                <h4 className={styles.sectionLabel}>About</h4>
                <p className={styles.desc}>{description}</p>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className={styles.tagsBlock}>
                <h4 className={styles.sectionLabel}>Details</h4>
                <div className={styles.tags}>
                  {tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Color grid (all) */}
            {colors.length > 12 && (
              <div className={styles.allColorsBlock}>
                <h4 className={styles.sectionLabel}>{colors.length} Shades</h4>
                <div className={styles.allColors}>
                  {colors.map((c, i) => (
                    <button
                      key={i}
                      className={`${styles.colorDot} ${i === activeColorIdx ? styles.colorDotActive : ''}`}
                      style={{ background: c.hex_value || '#ccc' }}
                      onClick={() => setActiveColorIdx(i)}
                      title={c.colour_name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className={styles.ctaRow}>
              {product.product_link && (
                <a
                  href={product.product_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtn}
                >
                  Shop Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              )}
              {product.website_link && (
                <a
                  href={product.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryBtn}
                >
                  Brand Site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
