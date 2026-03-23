/**
 * App.jsx
 * Root entry. Composes: AppProvider → Toast + Navbar + main(Router) + Footer
 */

import React from 'react';
import { AppProvider, useApp } from './store';
import Toast    from './components/ui/Toast';
import Navbar   from './components/layout/Navbar';
import Footer   from './components/layout/Footer';
import Router   from './mainPage/Router';
import CartSync from './components/features/cart/CartSync';

function AppShell() {
  const { toast } = useApp();
  return (
    <div className="min-h-screen bg-slate-50 font-sans">

        <CartSync />
      {/* Fixed notification */}
      <Toast toast={toast} />

      {/* Sticky nav */}
      <Navbar />

      {/* Page content */}
      <main className="max-w-[1280px] mx-auto px-7 py-9">
        <Router />
      </main>

      {/* Footer */}
      <div className="max-w-[1280px] mx-auto px-7">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
