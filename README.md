# 💄 Beauté Explorer

> A modern makeup catalog app built with React + Vite — perfect for your portfolio.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite) ![CSS Modules](https://img.shields.io/badge/CSS-Modules-blue)

---

## ✨ Features

### 🛍️ Product Catalog
- Fetches real data from [Makeup API](http://makeup-api.herokuapp.com)
- Responsive card grid with elegant hover animations
- Image lazy loading with emoji fallbacks
- Color swatch previews directly on cards

### 🔍 Filter & Search
- **Live search** — filter by name, brand, or description
- **Brand filter** — Maybelline, L'Oréal, NYX, Revlon & more
- **Category chips** — Lipstick, Foundation, Eyeshadow, Blush, etc.
- **Price slider** — max price filter ($5–$100)
- **Sort options** — Featured, Price ↑↓, Top Rated, A→Z

### 💬 Product Detail Modal
- Full-screen modal with image, description, and rating
- Interactive color swatches with shade names
- Tags and product metadata
- Direct link to purchase / brand website
- Keyboard accessible (Escape to close)

### 🩷 Wishlist
- Like/save products with the heart button
- Persisted to `localStorage` (survives page refresh)
- Wishlist counter shown in header

### ⚡ Performance & UX
- Loading skeleton cards during API fetch
- Pagination (24 products per page)
- Error handling with retry option
- Abort controller for cancelled requests
- Scroll to top on page change

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.jsx / .module.css       # Sticky header with search
│   ├── Hero.jsx / .module.css         # Hero banner with marquee
│   ├── FilterBar.jsx / .module.css    # Filters, sort, category chips
│   ├── ProductCard.jsx / .module.css  # Individual product card
│   ├── ProductModal.jsx / .module.css # Full-screen detail modal
│   ├── SkeletonCard.jsx / .module.css # Loading placeholder
│   ├── Pagination.jsx / .module.css   # Page navigation
│   ├── EmptyState.jsx / .module.css   # No results / error screen
│   ├── StarRating.jsx                 # Reusable star rating
│   └── Footer.jsx / .module.css       # Footer
├── hooks/
│   ├── useProducts.js  # API fetch, filter, sort, paginate
│   └── useWishlist.js  # Wishlist state + localStorage
├── utils/
│   ├── constants.js    # BRANDS, CATEGORIES, config
│   └── helpers.js      # formatPrice, truncate, sort, filter
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles + CSS variables
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Install & Run

```bash
# Clone or download the project
cd beaute-explorer

# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--font-display` | Cormorant Garamond (elegant serif) |
| `--font-body` | DM Sans (clean sans-serif) |
| `--petal` | `#D4556E` (primary accent) |
| `--blush` | `#F0A0BB` (mid tone) |
| `--rose` | `#F8C8D4` (soft background) |
| `--cream` | `#FFFAF7` (base background) |

---

## 🧩 Key Technical Concepts

- **Custom Hooks** — `useProducts` separates all data logic from UI
- **CSS Modules** — scoped styles, zero conflicts
- **AbortController** — cancels in-flight fetch on filter change
- **useMemo/useCallback** — prevents unnecessary re-renders
- **localStorage** — persists wishlist across sessions
- **Responsive Grid** — CSS `auto-fill` + media queries

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-dom` | DOM rendering |
| `vite` | Build tool & dev server |
| `@vitejs/plugin-react` | React Fast Refresh |

> No UI libraries used — all components are hand-crafted.

---

## 🌐 API Reference

**Base URL:** `https://makeup-api.herokuapp.com/api/v1/products.json`

| Parameter | Type | Description |
|-----------|------|-------------|
| `brand` | string | Filter by brand name |
| `product_type` | string | Filter by category |

---

*Made with 🌸 as a portfolio project.*
