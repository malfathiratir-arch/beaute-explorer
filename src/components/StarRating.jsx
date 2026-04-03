// ============================================
// BEAUTÉ EXPLORER — StarRating Component
// ============================================

import React from 'react'

export default function StarRating({ rating, size = 14, showNumber = false }) {
  const r = parseFloat(rating) || 0
  const rounded = Math.round(r * 2) / 2 // Round to nearest 0.5

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(star => {
          const filled = star <= Math.floor(rounded)
          const half = !filled && star - 0.5 === rounded

          return (
            <svg
              key={star}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`half-${star}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#D4556E" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={filled ? '#D4556E' : half ? `url(#half-${star})` : 'none'}
                stroke="#D4556E"
                strokeWidth="1.5"
                opacity={filled || half ? 1 : 0.3}
              />
            </svg>
          )
        })}
      </div>
      {showNumber && r > 0 && (
        <span style={{
          fontSize: size - 2,
          color: 'var(--text-light)',
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
        }}>
          {r.toFixed(1)}
        </span>
      )}
    </div>
  )
}
