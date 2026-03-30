import React from 'react';
import { AppProvider, useApp } from './store';
import Toast from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Router from './routes/Router';
import CartSync from './components/features/cart/CartSync';

function AppShell() {
  const { toast, currentPage } = useApp();

  const isAuthPage =
    currentPage === 'login' ||
    currentPage === 'signup' ||
    currentPage === 'forgot-password';

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden">
      <CartSync />
      <Toast toast={toast} />

      {!isAuthPage && <Navbar />}

      {isAuthPage ? (
        <Router />
      ) : (
        <>
          <main className="max-w-[1280px] mx-auto px-7 py-9">
            <Router />
          </main>
         <Footer />
        </>
      )}
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