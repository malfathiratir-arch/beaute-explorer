Beauté Explorer

Aplikasi katalog makeup modern yang dibangun dengan React + Vite, cocok untuk portfolio.

Fitur
Katalog Produk
Menampilkan data produk nyata dari Makeup API
Grid responsif dengan efek hover halus
Gambar dimuat secara lazy-loading
Preview warna langsung pada kartu produk
Pencarian dan Filter
Pencarian langsung berdasarkan nama, brand, atau deskripsi
Filter brand: Maybelline, L'Oréal, NYX, Revlon, dan lainnya
Filter kategori: Lipstick, Foundation, Eyeshadow, Blush, dll.
Slider harga maksimum
Opsi pengurutan: Featured, Harga naik/turun, Top Rated, A→Z
Detail Produk
Modal layar penuh dengan gambar, deskripsi, dan rating
Pilihan warna interaktif dengan nama shade
Tautan langsung ke situs brand
Bisa ditutup dengan tombol Escape
Wishlist
Menyimpan produk favorit dengan tombol hati
Wishlist tersimpan di localStorage
Counter wishlist ditampilkan di header
Performa dan UX
Skeleton loading saat mengambil data
Pagination (24 produk per halaman)
Penanganan error dengan opsi coba ulang
Scroll ke atas saat mengganti halaman

src/
├── components/
│   ├── Header.jsx / .module.css
│   ├── Hero.jsx / .module.css
│   ├── FilterBar.jsx / .module.css
│   ├── ProductCard.jsx / .module.css
│   ├── ProductModal.jsx / .module.css
│   ├── SkeletonCard.jsx / .module.css
│   ├── Pagination.jsx / .module.css
│   ├── EmptyState.jsx / .module.css
│   ├── StarRating.jsx
│   └── Footer.jsx / .module.css
├── hooks/
│   ├── useProducts.js
│   └── useWishlist.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css  
