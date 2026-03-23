/**
 * store/index.jsx
 * Global state via React Context + useReducer.
 * Exports: AppProvider, useApp
 */

import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { getProducts, createProduct } from '../API/ProductApi';
import { PRODUCTS } from '../data/products';

// ── Action Types ───────────────────────────────────────────────
export const ACTIONS = {
  NAVIGATE: 'NAVIGATE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CART_ADD: 'CART_ADD',
  CART_REMOVE: 'CART_REMOVE',
  CART_UPDATE_QTY: 'CART_UPDATE_QTY',
  CART_CLEAR: 'CART_CLEAR',
  SET_CART: 'SET_CART',
  WISHLIST_TOGGLE: 'WISHLIST_TOGGLE',
  SET_SEARCH: 'SET_SEARCH',
  SET_CATEGORY: 'SET_CATEGORY',
  SHOW_TOAST: 'SHOW_TOAST',
  CLEAR_TOAST: 'CLEAR_TOAST',
   SET_SORT:       'SET_SORT',
  SET_PRICE_RANGE:'SET_PRICE_RANGE',
  SET_BADGE:      'SET_BADGE', 
   SET_LOCATION: 'SET_LOCATION',
};

// ── Initial State ──────────────────────────────────────────────
const INITIAL_STATE = {
  user: null,
  currentPage: 'home',
  selectedProduct: null,
  searchQuery: '',
  selectedCategory: 'All',
  cart: [],
  wishlist: [],
  toast: null,
   products:         [],     
  loading:          true,
   sortBy:         'default',    // 'default' | 'price_asc' | 'price_desc' | 'rating' | 'newest'
  priceRange:     [0, 2000],    // [min, max]
  badgeFilter:    '',    
    location: { city: 'Coimbatore', pin: '641001' },
};

// ── Pure Reducer ───────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NAVIGATE:
      return {
        ...state,
        currentPage: action.payload.page,
        selectedProduct: action.payload.product ?? null,
      };

    case ACTIONS.LOGIN:
      return { ...state, user: action.payload, currentPage: 'home' };

    case ACTIONS.LOGOUT:
      return { ...state, user: null, cart: [], currentPage: 'home' };

    case ACTIONS.CART_ADD: {
      const existing = state.cart.find(i => i.id === action.payload.id);
      return {
        ...state,
        cart: existing
          ? state.cart.map(i =>
              i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
            )
          : [...state.cart, { ...action.payload, qty: 1 }],
      };
    }

    case ACTIONS.CART_REMOVE:
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };

    case ACTIONS.CART_UPDATE_QTY:
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: Math.max(1, action.payload.qty) }
            : i
        ),
      };

      case 'LOAD_PRODUCTS':
  return { ...state, products: action.payload, loading: false };

    case ACTIONS.CART_CLEAR:
      return { ...state, cart: [] };

    case ACTIONS.SET_CART:
      return { ...state, cart: action.payload };

    case ACTIONS.WISHLIST_TOGGLE: {
      const id = action.payload;
      return {
        ...state,
        wishlist: state.wishlist.includes(id)
          ? state.wishlist.filter(x => x !== id)
          : [...state.wishlist, id],
      };
    }

    case ACTIONS.SET_SEARCH:
      return { ...state, searchQuery: action.payload };

    case ACTIONS.SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case ACTIONS.SHOW_TOAST:
      return { ...state, toast: action.payload };

    case ACTIONS.CLEAR_TOAST:
      return { ...state, toast: null };
      case ACTIONS.SET_SORT:
  return { ...state, sortBy: action.payload };

case ACTIONS.SET_PRICE_RANGE:
  return { ...state, priceRange: action.payload };

case ACTIONS.SET_BADGE:
  return { ...state, badgeFilter: action.payload };
      case ACTIONS.SET_LOCATION:
  return { ...state, location: action.payload };


    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────
const AppContext = createContext(null);

// ── Provider ───────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  
// STEP 7 — Handle loading state, auto-seed if DB empty, catch errors
useEffect(() => {
  const init = async () => {
    try {
      let products = await getProducts();

      // DB is empty on first deploy → seed all static products silently
      if (products.length === 0) {
        for (const p of PRODUCTS) {
          const { id, ...rest } = p;   // strip old numeric id
          await createProduct(rest);
        }
        products = await getProducts(); // fetch again after seeding
      }

      dispatch({ type: 'LOAD_PRODUCTS', payload: products });

    } catch (err) {
      console.error('Failed to load products from DB:', err);
      // Fallback to static file so app never breaks
      dispatch({ type: 'LOAD_PRODUCTS', payload: PRODUCTS });
    }
  };

  init();
}, []);

  const navigate = useCallback((page, product = null) =>
    dispatch({ type: ACTIONS.NAVIGATE, payload: { page, product } }), []);

  const login = useCallback(user =>
    dispatch({ type: ACTIONS.LOGIN, payload: user }), []);

  const logout = useCallback(() =>
    dispatch({ type: ACTIONS.LOGOUT }), []);
  
  const setLocation = useCallback((loc) =>
  dispatch({ type: ACTIONS.SET_LOCATION, payload: loc }), []);

  const addToCart = useCallback(product =>
    dispatch({ type: ACTIONS.CART_ADD, payload: product }), []);

  const removeFromCart = useCallback(id =>
    dispatch({ type: ACTIONS.CART_REMOVE, payload: id }), []);

  const updateCartQty = useCallback((id, qty) =>
    dispatch({ type: ACTIONS.CART_UPDATE_QTY, payload: { id, qty } }), []);

  const clearCart = useCallback(() =>
    dispatch({ type: ACTIONS.CART_CLEAR }), []);

  const setCart = useCallback(items =>
    dispatch({ type: ACTIONS.SET_CART, payload: items }), []);

  const toggleWishlist = useCallback(id =>
    dispatch({ type: ACTIONS.WISHLIST_TOGGLE, payload: id }), []);
    

  const setSearch = useCallback(query => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: query });
    dispatch({ type: ACTIONS.NAVIGATE, payload: { page: 'home', product: null } });
  }, []);

  const setCategory = useCallback(cat => {
    dispatch({ type: ACTIONS.SET_CATEGORY, payload: cat });
    dispatch({ type: ACTIONS.NAVIGATE, payload: { page: 'home', product: null } });
  }, []);
  const setSort = useCallback(sort =>
  dispatch({ type: ACTIONS.SET_SORT, payload: sort }), []);

const setPriceRange = useCallback(range =>
  dispatch({ type: ACTIONS.SET_PRICE_RANGE, payload: range }), []);

const setBadge = useCallback(badge => {
  dispatch({ type: ACTIONS.SET_BADGE, payload: badge });
  dispatch({ type: ACTIONS.NAVIGATE, payload: { page: 'home', product: null } });
}, []);

  const showToast = useCallback((message, type = 'success') => {
    dispatch({ type: ACTIONS.SHOW_TOAST, payload: { message, type } });
    setTimeout(() => dispatch({ type: ACTIONS.CLEAR_TOAST }), 2800);
  }, []);


  
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{
      ...state,
      cartCount,
      cartSubtotal,
      navigate,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      setCart,
      toggleWishlist,
      setSearch,
      setCategory,
      showToast,
      setSort, 
      setPriceRange, 
      setBadge, 
      setLocation, 
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}