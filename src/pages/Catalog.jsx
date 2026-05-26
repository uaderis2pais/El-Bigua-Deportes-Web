import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { useCatalog } from '../context/CatalogContext';
import { SearchX, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../animations/variants';


const CATEGORIES = ["Todos", "Pesca", "Caza", "Camping", "Nautica"];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'name_asc', label: 'Nombre: A-Z' }
];

export default function Catalog() {
  const { products, isLoading } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "Todos");
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const [visibleCount, setVisibleCount] = useState(12);

  React.useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearchSubmit = () => {
    const newParams = new URLSearchParams(searchParams);
    if (localQuery.trim()) {
      newParams.set('q', localQuery.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  React.useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = products || [];

    // Filter by query
    if (query) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.category?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "Todos") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name_asc': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return result;
  }, [query, selectedCategory, sortBy, products]);

  // Reset visible count when filters change
  React.useEffect(() => {
    setVisibleCount(12);
  }, [query, selectedCategory, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="w-full min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">Catálogo de Productos</h1>
        {query ? (
          <p className="text-neutral-500 text-lg">Resultados para: <span className="font-bold text-neutral-900 dark:text-white">"{query}"</span></p>
        ) : (
          <p className="text-neutral-500 text-lg">Explora nuestra colección completa de equipamiento técnico.</p>
        )}
        <div className="w-16 h-1 bg-hunter-orange mt-6"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Mobile filter toggle */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full flex items-center justify-center gap-2 bg-neutral-100 dark:bg-military-blue-light p-4 rounded font-bold uppercase dark:text-white"
        >
          <Filter className="w-5 h-5" /> Filtros
        </button>

        {/* Sidebar */}
        <div className={`w-full lg:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider mb-4 border-b border-neutral-200 dark:border-military-blue-light pb-2 dark:text-white">Buscar</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar por nombre..." 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                className="w-full p-2 pl-3 pr-10 border border-neutral-300 dark:border-military-blue-light dark:bg-military-blue-dark dark:text-white rounded focus:outline-none focus:border-hunter-orange transition-colors"
              />
              <button 
                onClick={handleSearchSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-hunter-orange transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold uppercase tracking-wider mb-4 border-b border-neutral-200 dark:border-military-blue-light pb-2 dark:text-white">Categorías</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors ${selectedCategory === cat ? 'bg-hunter-orange text-white font-medium' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-military-blue-light'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200 dark:border-military-blue-light">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{filteredProducts.length} productos encontrados</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-neutral-300 dark:border-military-blue-light bg-white dark:bg-military-blue-dark text-neutral-900 dark:text-white rounded p-2 focus:outline-none focus:border-hunter-orange"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
              >
                {visibleProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
              
              {visibleCount < filteredProducts.length && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="bg-hunter-orange text-white font-bold uppercase text-sm px-8 py-4 tracking-wider hover:bg-hunter-orange-hover transition-colors inline-block rounded"
                  >
                    Cargar más productos
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-neutral-50 dark:bg-military-blue-dark rounded-xl border border-neutral-200 dark:border-military-blue-light">
              <SearchX className="w-16 h-16 text-neutral-300 dark:text-military-blue-light mb-4" />
              <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-white mb-2">No se encontraron productos</h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-md">Prueba ajustando los filtros o cambiando el término de búsqueda.</p>
              <button 
                onClick={() => { setSelectedCategory("Todos"); setSortBy('featured'); }}
                className="mt-6 text-hunter-orange font-bold hover:underline"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
