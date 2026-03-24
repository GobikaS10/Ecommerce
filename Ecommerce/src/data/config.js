/**
 * data/config.js
 * Site-wide config: navigation, trust items, badge map, footer links.
 */

// ── Badge label → Tailwind classes ────────────────────────────
export const BADGE_CONFIG = {
  'Best Seller': { bg: 'bg-amber-100',   text: 'text-amber-800',   ring: 'ring-amber-200' },
  'New':         { bg: 'bg-blue-100',    text: 'text-blue-800',    ring: 'ring-blue-200'  },
  'Sale':        { bg: 'bg-red-100',     text: 'text-red-700',     ring: 'ring-red-200'   },
  'Popular':     { bg: 'bg-purple-100',  text: 'text-purple-800',  ring: 'ring-purple-200'},
  'Premium':     { bg: 'bg-yellow-100',  text: 'text-yellow-800',  ring: 'ring-yellow-200'},
  'Pro':         { bg: 'bg-emerald-100', text: 'text-emerald-800', ring: 'ring-emerald-200'},
  'Eco':         { bg: 'bg-green-100',   text: 'text-green-800',   ring: 'ring-green-200' },
  'Top Pick':    { bg: 'bg-orange-100',  text: 'text-orange-800',  ring: 'ring-orange-200'},
  'Top Rated':   { bg: 'bg-rose-100',    text: 'text-rose-800',    ring: 'ring-rose-200'  },
  '_default':    { bg: 'bg-slate-100',   text: 'text-slate-700',   ring: 'ring-slate-200' },
};

// ── Trust strip items ─────────────────────────────────────────
export const TRUST_ITEMS = [
  { id: 'delivery', icon: '🚚', title: 'Free Delivery',   subtitle: 'On orders over $49',     accent: 'text-sky-600'     },
  { id: 'returns',  icon: '🔄', title: 'Easy Returns',    subtitle: '30-day return policy',   accent: 'text-purple-600'  },
  { id: 'secure',   icon: '🔒', title: 'Secure Payment',  subtitle: '256-bit SSL encryption', accent: 'text-emerald-600' },
  { id: 'rated',    icon: '⭐', title: 'Top Rated',       subtitle: '4.8/5 from 2M+ reviews', accent: 'text-amber-600'   },
];

// ── Product detail perks ──────────────────────────────────────
export const PRODUCT_PERKS = [
  { id: 'returns',   icon: '🔄', label: 'Free 30-day returns' },
  { id: 'warranty',  icon: '🛡️', label: '2-year warranty'     },
  { id: 'secure',    icon: '🔒', label: 'Secure checkout'     },
  { id: 'authentic', icon: '✅', label: 'Authentic product'   },
];

// ── Announcement bar ──────────────────────────────────────────
export const ANNOUNCEMENT = '✦ FREE SHIPPING ON ORDERS OVER $49 · EASY 30-DAY RETURNS · SECURE CHECKOUT ✦';

// ── Footer columns ────────────────────────────────────────────
export const FOOTER_COLUMNS = [
  { heading: 'Shop',    links: ['Electronics', 'Fashion', 'Home & Living', 'Books', 'New Arrivals', 'Sale'] },
  { heading: 'Support', links: ['Help Center', 'Track Order', 'Returns & Exchanges', 'Contact Us'] },
  { heading: 'Company', links: ['About Us', 'Careers', 'Press', 'Sustainability', 'Blog'] },
];

export const LEGAL_LINKS  = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];
export const COPYRIGHT     = '© 2026 ShopX Inc. All rights reserved.';

// ── Social links ──────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { id: 'facebook',  emoji: '📘', label: 'Facebook',  href: '#' },
  { id: 'twitter',   emoji: '🐦', label: 'Twitter',   href: '#' },
  { id: 'instagram', emoji: '📷', label: 'Instagram', href: '#' },
  { id: 'youtube',   emoji: '▶️',  label: 'YouTube',   href: '#' },
];

// ── Cart: free shipping threshold ─────────────────────────────
export const FREE_SHIPPING_THRESHOLD = 49;
export const TAX_RATE                = 0.08;
export const SHIPPING_COST           = 9.99;


 export const CATEGORY_META = {
  
  Electronics: {
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&auto=format',
    color: 'border-sky-200',
    activeColor: 'bg-sky-600',
    label: 'text-sky-700',
    count: '8 products',
  },
  Fashion: {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&auto=format',
    color: 'border-pink-200',
    activeColor: 'bg-pink-600',
    label: 'text-pink-700',
    count: '6 products',
  },
  Home: {
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop&auto=format',
    color: 'border-amber-200',
    activeColor: 'bg-amber-600',
    label: 'text-amber-700',
    count: '6 products',
  },
  Books: {
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop&auto=format',
    color: 'border-emerald-200',
    activeColor: 'bg-emerald-600',
    label: 'text-emerald-700',
    count: '4 products',
  },
};
export const CITIES = [
  { city: 'Coimbatore', pin: '641001' },
  { city: 'Chennai',    pin: '600001' },
  { city: 'Bangalore',  pin: '560001' },
  { city: 'Mumbai',     pin: '400001' },
  { city: 'Delhi',      pin: '110001' },
  { city: 'Hyderabad',  pin: '500001' },
];