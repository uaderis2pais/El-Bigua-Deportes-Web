import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ContactSection from './components/layout/ContactSection';
import CartModal from './components/ui/CartModal';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/layout/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { CatalogProvider } from './context/CatalogContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CatalogProvider>
      <CartProvider>
        <Router>
        <div className="min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300">
          <ScrollToTop />
          <Toaster position="bottom-right" />
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
            </Routes>
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
