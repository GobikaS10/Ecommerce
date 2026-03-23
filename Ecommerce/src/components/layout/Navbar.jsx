import React, { useState } from 'react';
import { useApp } from '../../store';
import { CATEGORIES } from '../../data/products';
import { ANNOUNCEMENT } from '../../data/config';

// ── Cities list — uses "city" key to match store shape ─────────
const CITIES = [
  { city: 'Coimbatore', pin: '641001' },
  { city: 'Chennai',    pin: '600001' },
  { city: 'Bangalore',  pin: '560001' },
  { city: 'Mumbai',     pin: '400001' },
  { city: 'Delhi',      pin: '110001' },
  { city: 'Hyderabad',  pin: '500001' },
];

// ── AnnouncementBar ────────────────────────────────────────────
function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="bg-slate-900 text-slate-300 text-[10px] font-medium tracking-widest text-center py-2 relative">
      <span className="opacity-40">✦</span> {ANNOUNCEMENT} <span className="opacity-40">✦</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

// ── Logo ───────────────────────────────────────────────────────
function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 shrink-0 group">
  {/* Monogram mark */}
  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md group-hover:bg-slate-700 transition-all duration-200 group-hover:scale-105">
    <span className="text-[15px] font-black text-white tracking-tighter leading-none">
      Z<span className="text-amber-400">R</span>
    </span>
  </div>

  {/* Text */}
  <div className="hidden sm:block">
    <span className="font-display text-xl font-bold text-slate-900 tracking-tight leading-none">
      Ze<span className="text-amber-400">ra</span>
    </span>
    <p className="text-[9px] text-slate-400 font-medium tracking-widest uppercase leading-none mt-0.5">
      Premium Store
    </p>
  </div>
</button>
  );
}

// ── LocationPicker ─────────────────────────────────────────────
function LocationPicker() {
  const { location, setLocation } = useApp();
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const detectLocation = () => {
    setLoading(true);
    navigator.geolocation?.getCurrentPosition(
      () => {
        setLocation({ city: 'Current Location', pin: '' });
        setLoading(false);
        setOpen(false);
      },
      () => setLoading(false)
    );
  };

  return (
    <div ref={ref} className="relative hidden md:block shrink-0">

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-3 py-1.5 border-[1.5px] rounded-[14px] transition-all duration-200 min-w-[140px]
          ${open ? 'border-sky-400 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/50'}`}
      >
        <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div className="flex flex-col items-start flex-1 min-w-0">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
            Deliver to
          </span>
          <span className="text-xs font-semibold text-slate-900 leading-tight truncate w-full text-left">
            {location.city}
          </span>
        </div>
        <svg
          className={`w-3 h-3 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-modal z-50 p-2 animate-scale-in">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
            Select delivery location
          </p>

          {CITIES.map(c => (
            <button
              key={c.city}
              onClick={() => {
                setLocation(c);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150
                ${location.city === c.city ? 'bg-sky-50' : 'hover:bg-slate-50'}`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 transition-colors
                ${location.city === c.city ? 'bg-sky-500' : 'bg-slate-200'}`}
              />
              <span className={`text-sm font-semibold flex-1
                ${location.city === c.city ? 'text-sky-700' : 'text-slate-700'}`}>
                {c.city}
              </span>
              <span className="text-xs text-slate-400 font-medium">{c.pin}</span>
            </button>
          ))}

          <div className="border-t border-slate-100 mt-2 pt-2">
            <button
              onClick={detectLocation}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sky-600 hover:bg-sky-50 transition-colors text-sm font-semibold"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
              )}
              Use my current location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SearchBar ──────────────────────────────────────────────────
function SearchBar({ value, onChange, onClear }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`
      flex-1 flex items-center rounded-2xl overflow-hidden transition-all duration-300
      ${focused
        ? 'bg-white border-2 border-sky-400 shadow-lg shadow-sky-100'
        : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300 hover:bg-white'}
    `}>
      <span className={`pl-4 transition-colors duration-200 ${focused ? 'text-sky-500' : 'text-slate-400'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search products, brands and categories…"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 py-3 pl-3 pr-2 outline-none"
      />
      {value ? (
        <button onClick={onClear} className="pr-4 text-slate-400 hover:text-slate-700 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      ) : (
        <span className="pr-3 hidden sm:flex items-center gap-1 text-[10px] text-slate-300 font-medium border border-slate-200 rounded-lg px-2 py-1 mr-2">
          ⌘K
        </span>
      )}
    </div>
  );
}

// ── WishlistButton ─────────────────────────────────────────────
function WishlistButton({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-red-50 hover:border-red-200 text-slate-500 hover:text-red-500 transition-all duration-200 shrink-0 group"
    >
      <svg className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
          {count}
        </span>
      )}
    </button>
  );
}

// ── CartButton ─────────────────────────────────────────────────
function CartButton({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white pl-4 pr-4 h-10 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shrink-0"
    >
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span className="text-xs font-bold tracking-wide">Cart</span>
      {count > 0 ? (
        <span className="w-5 h-5 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      ) : (
        <span className="w-5 h-5 bg-white/15 text-white/50 text-[10px] font-bold rounded-full flex items-center justify-center">
          0
        </span>
      )}
    </button>
  );
}

// ── UserArea ───────────────────────────────────────────────────
function UserArea({ user, onLogin, onSignup, onLogout }) {
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-sm shrink-0">
            {user.name[0].toUpperCase()}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Hello,</p>
            <p className="text-xs font-black text-slate-900">{user.name.split(' ')[0]}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="text-xs font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-2 rounded-xl transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onLogin}
        className="text-xs font-bold text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200"
      >
        Sign In
      </button>
      <button
        onClick={onSignup}
        className="text-xs font-bold text-white bg-slate-900 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        Join Free
      </button>
    </div>
  );
}

// ── Category SVG Icons ─────────────────────────────────────────
const CAT_ICONS = {
  All: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Electronics: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Fashion: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  ),
  Home : (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Books: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
};

// ── CategoryTabs ───────────────────────────────────────────────
function CategoryTabs({ active, onSelect }) {
  return (
    <div className="border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-7 flex items-center gap-0.5 overflow-x-auto py-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl
              whitespace-nowrap transition-all duration-200 tracking-wide
              ${cat === active
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
            `}
          >
            <span className={cat === active ? 'text-white' : 'text-slate-400'}>
              {CAT_ICONS[cat]}
            </span>
            {cat}
          </button>
        ))}

        {/* <div className="ml-auto flex items-center gap-1.5 shrink-0 pl-4 border-l border-slate-100">
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity=".2"/>
              <path d="M8 12l2 2 4-4" stroke="currentColor"/>
            </svg>
            Sale
          </button>
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            New
          </button>
        </div> */}
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────
export default function Navbar() {
  const {
    user, searchQuery, selectedCategory, cartCount, wishlist,
    navigate, logout, setSearch, setCategory,
  } = useApp();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-nav">
      <AnnouncementBar />

      {/* Main row */}
      <div className="max-w-[1280px] mx-auto px-7 h-16 flex items-center gap-5 border-b border-slate-100">
        <Logo onClick={() => navigate('home')} />

        <LocationPicker />

        <SearchBar
          value={searchQuery}
          onChange={e => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />

        <div className="flex items-center gap-2 shrink-0">
          <UserArea
            user={user}
            onLogin={() => navigate('login')}
            onSignup={() => navigate('signup')}
            onLogout={logout}
          />
          <WishlistButton count={wishlist?.length ?? 0} onClick={() => {}} />
          <CartButton count={cartCount} onClick={() => navigate('cart')} />
        </div>
      </div>

      {/* Category tabs */}
      <CategoryTabs active={selectedCategory} onSelect={setCategory} />
    </nav>
  );
}