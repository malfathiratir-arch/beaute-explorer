// ============================================
// BEAUTÉ EXPLORER — ProductCard Component
// ============================================

import React, { useState } from 'react'
import StarRating from './StarRating'
import { formatPrice, staggerDelay, titleCase } from '../utils/helpers'
import { CATEGORIES } from '../utils/constants'
import styles from './ProductCard.module.css'

const FALLBACK_ICONS = {
  lipstick: '💄', lip_liner: '✏️', foundation: '🫙',
  eyeliner: '🖊️', eyeshadow: '👁️', mascara: '✨',
  blush: '🌸', bronzer: '🌞', nail_polish: '💅',
}

function getCategoryLabel(type) {
  return CATEGORIES.find(c => c.value === type)?.label || titleCase(type?.replace(/_/g, ' ') || '')
}

export default function ProductCard({ product, onSelect, isLiked, onToggleLike, index }) {
  const [imgErr, setImgErr] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [likeAnimating, setLikeAnimating] = useState(false)

  const price = formatPrice(product.price)
  const icon = FALLBACK_ICONS[product.product_type] || '✨'
  const shadeCount = product.product_colors?.length || 0

  function handleLike(e) {
    e.stopPropagation()
    setLikeAnimating(true)
    onToggleLike(product.id)
    setTimeout(() => setLikeAnimating(false), 350)
  }

  return (
    <article
      className={`${styles.card} fade-up`}
      style={{ animationDelay: staggerDelay(index) }}
      onClick={() => onSelect(product)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(product)}
      aria-label={`View ${product.name}`}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        {!imgErr && product.image_link ? (
          <img
            src={product.image_link}
            alt={product.name}
            className={`${styles.image} ${hovering ? styles.imageHover : ''}`}
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imageFallback}>
            <span className={styles.fallbackIcon}>{icon}</span>
            <span className={styles.fallbackLabel}>{getCategoryLabel(product.product_type)}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className={styles.imageOverlay} />

        {/* Like button */}
        <button
          className={`${styles.likeBtn} ${isLiked ? styles.likeBtnActive : ''} ${likeAnimating ? styles.likePop : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isLiked}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Category badge */}
        {product.product_type && (
          <div className={styles.badge}>
            {icon} {getCategoryLabel(product.product_type)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.brand}>{titleCase(product.brand || 'Unknown')}</div>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.meta}>
          <div className={styles.ratingBlock}>
            {product.rating ? (
              <>
                <StarRating rating={product.rating} size={13} />
                <span className={styles.ratingText}>{parseFloat(product.rating).toFixed(1)}</span>
                {shadeCount > 0 && <span className={styles.shades}>· {shadeCount} shades</span>}
              </>
            ) : (
              shadeCount > 0 && <span className={styles.shades}>{shadeCount} shades</span>
            )}
          </div>
          <div className={styles.price}>
            {price || <span className={styles.priceNA}>–</span>}
          </div>
        </div>

        {/* Color dots */}
        {shadeCount > 0 && (
          <div className={styles.colorDots}>
            {product.product_colors.slice(0, 8).map((c, i) => (
              <span
                key={i}
                className={styles.dot}
                style={{ background: c.hex_value || '#ddd' }}
                title={c.colour_name}
              />
            ))}
            {shadeCount > 8 && <span className={styles.moreShades}>+{shadeCount - 8}</span>}
          </div>
        )}
      </div>
    </article>
  )
}
