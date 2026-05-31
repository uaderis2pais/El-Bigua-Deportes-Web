import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ContactSection from './components/layout/ContactSection';
import CartModal from './components/ui/CartModal';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/layout/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { CatalogProvider } from './context/CatalogContext';
import { Toaster } from 'react-hot-toast';
import { initGA } from './utils/analytics';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Contact = lazy(() => import('./pages/Contact'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    initGA();
  }, []);

  return (
    <CatalogProvider>
      <CartProvider>
        <Router>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          <ScrollToTop />
          <Toaster position="bottom-right" />
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <main className="flex-1">
            <Suspense fallback={
              <div className="min-h-[50vh] flex items-center justify-center bg-white dark:bg-military-blue-dark transition-colors duration-300">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-hunter-orange border-t-transparent"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
              </Routes>
            </Suspense>
          </main>
          <ContactSection />
          <FAQ />
          <Footer />
        </div>
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </Router>
      </CartProvider>
    </CatalogProvider>
  );
}

export default App;
