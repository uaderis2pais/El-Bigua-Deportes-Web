import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ArrowRight, Moon, Sun, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  { name: 'INICIO', path: '/' },
  { name: 'CATÁLOGO', path: '/catalog' },
  { name: 'PESCA', path: '/catalog?category=Pesca', subcategories: ['Cañas', 'Reeles', 'Señuelos'] },
  { name: 'CAZA', path: '/catalog?category=Caza', subcategories: ['Armas', 'Municiones', 'Accesorios'] },
  { name: 'NÁUTICA', path: '/catalog?category=Nautica', subcategories: ['Chalecos Salvavidas', 'Sogas y Anclas'] },
  { name: 'CAMPING', path: '/catalog?category=Camping', subcategories: ['Carpas', 'Anafes y Marmitas', 'Iluminación'] },
];

export default function Navbar({ onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      navigate(`/catalog?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-military-blue-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-military-blue-light sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">

            {/* Menu Toggle (Left) */}
            <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:text-hunter-orange transition-colors flex items-center gap-2 font-bold focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="hidden md:inline uppercase text-sm tracking-wider">Menú</span>
              </button>
            </div>

            {/* Logo (Center) */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="flex flex-col items-center group">
                <span className="font-logo text-4xl leading-none text-neutral-900 dark:text-white group-hover:text-hunter-orange dark:group-hover:text-hunter-orange transition-colors" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>el Biguá</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mt-1 uppercase group-hover:text-hunter-orange/80 transition-colors text-center">Caza - Pesca - Nautica - Camping</span>
              </Link>
            </div>

            {/* Right Actions (Dark Mode, Search, Cart) */}
            <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
              <button
                onClick={() => setIsDark(!isDark)}
                className="hidden md:flex relative items-center justify-between w-14 h-7 bg-neutral-200 dark:bg-military-blue rounded-full p-1 transition-colors duration-300 focus:outline-none"
              >
                <Moon className="w-4 h-4 text-neutral-400 z-10" />
                <Sun className="w-4 h-4 text-amber-500 z-10" />
                <motion.div
                  className="absolute w-5 h-5 bg-white rounded-full shadow"
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  initial={false}
                  animate={{
                    left: isDark ? "4px" : "calc(100% - 24px)"
                  }}
                />
              </button>
              <button onClick={() => setIsSearchOpen(true)} className="hidden md:flex hover:text-hunter-orange transition-colors focus:outline-none">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={onOpenCart}
                className="hover:text-hunter-orange transition-colors flex items-center gap-2 relative focus:outline-none"
              >
                <motion.div
                  key={cartCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="h-6 w-6 md:h-5 md:w-5" />
                  <span className="hidden md:inline text-sm font-medium">{cartCount} ítems</span>
                  {cartCount > 0 && (
                    <span className="md:hidden absolute -top-1 -right-1 bg-hunter-orange text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </motion.div>
              </button>
            </div>

          </div>

          {/* Search Bar Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white dark:bg-military-blue-dark z-50 flex items-center px-4 sm:px-6 lg:px-8 border-b border-hunter-orange"
              >
                <div className="w-full max-w-3xl mx-auto flex items-center gap-4">
                  <Search className="w-6 h-6 text-hunter-orange flex-shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Escribe para buscar productos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="flex-1 h-14 bg-transparent outline-none text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 font-medium"
                  />
                  <button onClick={closeSearch} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors flex-shrink-0">
                    <X className="w-6 h-6 text-neutral-500" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </nav>

      {/* Sidebar Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full sm:w-80 bg-white dark:bg-military-blue-dark z-[70] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-military-blue-light">
                <span className="font-logo text-3xl text-neutral-900 dark:text-white">el Biguá</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-military-blue rounded-full transition-colors text-neutral-500 dark:text-neutral-400 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {MENU_ITEMS.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    {item.subcategories ? (
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === item.name ? null : item.name)}
                        className="text-lg font-bold text-neutral-900 dark:text-white hover:text-hunter-orange dark:hover:text-hunter-orange py-2 transition-colors flex items-center justify-between group text-left w-full focus:outline-none"
                      >
                        {item.name}
                        <ChevronDown className={`w-5 h-5 text-hunter-orange transition-transform duration-300 ${expandedCategory === item.name ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-bold text-neutral-900 dark:text-white hover:text-hunter-orange dark:hover:text-hunter-orange py-2 transition-colors flex items-center justify-between group"
                      >
                        {item.name}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-hunter-orange" />
                      </Link>
                    )}

                    <AnimatePresence>
                      {item.subcategories && expandedCategory === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 flex flex-col space-y-3 mt-3 mb-2 border-l-2 border-hunter-orange/30">
                            <Link
                              to={item.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="text-neutral-900 dark:text-white font-bold hover:text-hunter-orange dark:hover:text-hunter-orange py-1 transition-colors text-sm"
                            >
                              Ver Todo en {item.name}
                            </Link>
                            {item.subcategories.map(sub => (
                              <Link
                                key={sub}
                                to={`/catalog?q=${encodeURIComponent(sub)}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-neutral-600 dark:text-neutral-400 hover:text-hunter-orange dark:hover:text-hunter-orange py-1 transition-colors text-sm font-medium"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="mt-8 border-t border-neutral-200 dark:border-military-blue-light pt-6 flex flex-col gap-6">
                  {/* Search in Drawer */}
                  <div className="flex items-center gap-3 bg-neutral-100 dark:bg-military-blue-light/30 p-3 rounded">
                    <Search className="w-5 h-5 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-500"
                    />
                  </div>

                  {/* Dark Mode in Drawer */}
                  <div className="flex items-center justify-between p-2">
                    <span className="text-neutral-900 dark:text-white font-bold">Modo Oscuro</span>
                    <button
                      onClick={() => setIsDark(!isDark)}
                      className="relative flex items-center justify-between w-14 h-7 bg-neutral-200 dark:bg-military-blue rounded-full p-1 transition-colors duration-300 focus:outline-none"
                    >
                      <Moon className="w-4 h-4 text-neutral-400 z-10" />
                      <Sun className="w-4 h-4 text-amber-500 z-10" />
                      <motion.div
                        className="absolute w-5 h-5 bg-white rounded-full shadow"
                        layout
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        initial={false}
                        animate={{
                          left: isDark ? "4px" : "calc(100% - 24px)"
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
