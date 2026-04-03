// ============================================
// BEAUTÉ EXPLORER — Constants & Config
// ============================================

export const API_BASE = 'https://makeup-api.herokuapp.com/api/v1/products.json'

export const BRANDS = [
  { value: 'maybelline', label: 'Maybelline' },
  { value: "l'oreal", label: "L'Oréal" },
  { value: 'nyx', label: 'NYX' },
  { value: 'revlon', label: 'Revlon' },
  { value: 'covergirl', label: 'CoverGirl' },
  { value: 'milani', label: 'Milani' },
  { value: 'e.l.f.', label: 'e.l.f.' },
  { value: 'almay', label: 'Almay' },
  { value: 'wet n wild', label: 'Wet n Wild' },
  { value: 'physicians formula', label: 'Physicians Formula' },
  { value: 'sally b\'s skin yummies', label: "Sally B's" },
  { value: 'pure anada', label: 'Pure Anada' },
]

export const CATEGORIES = [
  { value: 'lipstick', label: 'Lipstick', icon: '💄' },
  { value: 'lip_liner', label: 'Lip Liner', icon: '✏️' },
  { value: 'foundation', label: 'Foundation', icon: '🫙' },
  { value: 'eyeliner', label: 'Eyeliner', icon: '🖊️' },
  { value: 'eyeshadow', label: 'Eyeshadow', icon: '👁️' },
  { value: 'mascara', label: 'Mascara', icon: '✨' },
  { value: 'blush', label: 'Blush', icon: '🌸' },
  { value: 'bronzer', label: 'Bronzer', icon: '🌞' },
  { value: 'nail_polish', label: 'Nail Polish', icon: '💅' },
]

export const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'name_asc', label: 'Name A → Z' },
]

export const PER_PAGE = 24
export const MAX_PRICE = 100
export const MIN_PRICE = 0
