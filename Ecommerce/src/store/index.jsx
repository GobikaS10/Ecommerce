/**
 * store/index.jsx
 * Global state via Zustand.
 * Same useApp() API as before — zero changes needed in any component.
 */

import { create } from 'zustand';
import { PRODUCTS } from '../data/products';

const useApp = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────
  user: null,
  currentPage: 'home',
  selectedProduct: null,
  searchQuery: '',
  selectedCategory: 'All',
  cart: [],
  wishlist: [],
  toast: null,

  // missing state used in other files
  products: PRODUCTS,
  loading: false,
  location: { city: 'Coimbatore', pin: '641001' },
  sortBy: 'default',
  priceRange: [0, 2000],
  badgeFilter: '',

  // ── Derived ────────────────────────────────────────────────
  cartCount: 0,
  cartSubtotal: 0,

  // ── Navigation ─────────────────────────────────────────────
  navigate: (page, product = null) =>
    set({ currentPage: page, selectedProduct: product ?? null }),

  // ── Auth ───────────────────────────────────────────────────
  login: (user) => set({ user, currentPage: 'home' }),

  logout: () =>
    set({
      user: null,
      cart: [],
      cartCount: 0,
      cartSubtotal: 0,
      currentPage: 'home',
    }),

  // ── Location ───────────────────────────────────────────────
  setLocation: (location) => set({ location }),

  // ── Filters ────────────────────────────────────────────────
  setSort: (sortBy) => set({ sortBy }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setBadge: (badgeFilter) => set({ badgeFilter }),

  // ── Cart helpers ───────────────────────────────────────────
  _syncCart: (cart) => ({
    cart,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    cartSubtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
  }),

  addToCart: (product) =>
    set((s) => {
      const existing = s.cart.find((i) => i.id === product.id);
      const cart = existing
        ? s.cart.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...s.cart, { ...product, qty: 1 }];

      return s._syncCart(cart);
    }),

  removeFromCart: (id) =>
    set((s) => s._syncCart(s.cart.filter((i) => i.id !== id))),

  updateCartQty: (id, qty) =>
    set((s) =>
      s._syncCart(
        s.cart.map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, qty) } : i
        )
      )
    ),

  setCart: (cart) =>
    set((s) => s._syncCart(Array.isArray(cart) ? cart : [])),

  clearCart: () =>
    set({
      cart: [],
      cartCount: 0,
      cartSubtotal: 0,
    }),

  // ── Wishlist ───────────────────────────────────────────────
  toggleWishlist: (id) =>
    set((s) => ({
      wishlist: s.wishlist.includes(id)
        ? s.wishlist.filter((x) => x !== id)
        : [...s.wishlist, id],
    })),

  // ── Search & Category ──────────────────────────────────────
  setSearch: (searchQuery) =>
    set({ searchQuery, currentPage: 'home', selectedProduct: null }),

  setCategory: (selectedCategory) =>
    set({ selectedCategory, currentPage: 'home', selectedProduct: null }),

  // ── Toast ──────────────────────────────────────────────────
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 2800);
  },
}));

export { useApp };

// AppProvider kept as passthrough so App.jsx needs no change
export function AppProvider({ children }) {
  return children;
}