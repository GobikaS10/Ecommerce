/**
 * pages/Router.jsx
 * Maps currentPage state → page component.
 */

import React from 'react';
import { useApp } from '../store';
import HomePage     from './HomePage';
import LoginForm    from '../components/features/auth/LoginForm';
import SignupForm   from '../components/features/auth/SignupForm';
import ProductDetail from '../components/features/product/ProductDetail';
import CartPage     from '../components/features/cart/CartPage';

 const PAGE_MAP = {
  home:    HomePage,
  login:   LoginForm,
  signup:  SignupForm,
  product: ProductDetail,
  cart:    CartPage,
};

export default function Router() {
  const { currentPage } = useApp();
  const Page = PAGE_MAP[currentPage] || HomePage;
  return <Page />;
}
