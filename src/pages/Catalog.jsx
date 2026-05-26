import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { useCatalog } from '../context/CatalogContext';
import { SearchX, Filter, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../animations/variants';


const CATEGORIES = ["Todos", "Pesca", "Caza", "Camping", "Nautica"];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'name_asc', label: 'Nombre: A-Z' }
];

const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const matchesKeyword = (text, keyword) => {
  if (!text || !keyword) return false;
  const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'i');
  return regex.test(text);
};

const SUBCATEGORY_KEYWORDS = {
  // Pesca
  "canas": ["cana", "canas", "telescopica", "tramos", "bamboo", "bando", "lagoon"],
  "cana": ["cana", "canas", "telescopica", "tramos", "bamboo", "bando", "lagoon"],
  "reeles": ["reel", "reeles", "frontal", "rotativo", "baitcast", "flounder", "spinit", "colony", "shimano", "razor", "inferno", "xtreme", "crusader", "atlantis", "rulemanes"],
  "reel": ["reel", "reeles", "frontal", "rotativo", "baitcast", "flounder", "spinit", "colony", "shimano", "razor", "inferno", "xtreme", "crusader", "atlantis", "rulemanes"],
  "senuelos": ["senuelo", "senuelos", "boya", "boyas", "anzuelo", "anzuelos", "tanza", "tanzas", "aguara", "okuma", "plomada", "plomadas", "cuchillo fileteador"],
  "senuelo": ["senuelo", "senuelos", "boya", "boyas", "anzuelo", "anzuelos", "tanza", "tanzas", "aguara", "okuma", "plomada", "plomadas", "cuchillo fileteador"],
  "cajas y bolsos": ["caja", "cajas", "bolso", "bolsos", "mochila", "mochilas", "estanco", "estancos"],
  "caja y bolso": ["caja", "cajas", "bolso", "bolsos", "mochila", "mochilas", "estanco", "estancos"],
  
  // Caza
  "armas": ["arma", "armas", "pistola", "revolver", "escopeta", "rifle", "co2", "beretta", "browning", "colt", "python", "buck mark", "elite ii", "aire comprimido", "quiebre"],
  "arma": ["arma", "armas", "pistola", "revolver", "escopeta", "rifle", "co2", "beretta", "browning", "colt", "python", "buck mark", "elite ii", "aire comprimido", "quiebre"],
  "municiones": ["balin", "balines", "cartucho", "cartuchos", "municion", "municiones", "polvora", "apolo", "air boss", "stopping power"],
  "municion": ["balin", "balines", "cartucho", "cartuchos", "municion", "municiones", "polvora", "apolo", "air boss", "stopping power"],
  "indumentaria": ["camisa", "pantalon", "indumentaria", "remera", "gorra", "sombrero", "sombreros", "chaleco", "camisetas", "ropa", "tactico", "tactica", "piluso"],
  "accesorios": ["mira", "fundas", "porta", "limpieza", "baqueta", "cuchillo", "navaja", "funda", "shilba", "trento", "gold medal", "bushnell", "shilba", "lubrilina", "gas pimienta", "spray", "defensa"],
  "accesorio": ["mira", "fundas", "porta", "limpieza", "baqueta", "cuchillo", "navaja", "funda", "shilba", "trento", "gold medal", "bushnell", "shilba", "lubrilina", "gas pimienta", "spray", "defensa"],
  
  // Náutica
  "kayaks": ["kayak", "kayaks", "bote", "botes", "remo", "remos"],
  "kayak": ["kayak", "kayaks", "bote", "botes", "remo", "remos"],
  "chalecos salvavidas": ["chaleco", "salvavidas", "chalecos"],
  "chaleco salvavidas": ["chaleco", "salvavidas", "chalecos"],
  "motores": ["motor", "motores", "combustible", "bidon", "bidones"],
  "motor": ["motor", "motores", "combustible", "bidon", "bidones"],
  "sogas y anclas": ["soga", "sogas", "ancla", "anclas", "pala", "remos", "seguridad", "bengala", "bengalas"],
  "soga y ancla": ["soga", "sogas", "ancla", "anclas", "pala", "remos", "seguridad", "bengala", "bengalas"],
  
  // Camping
  "carpas": ["carpa", "carpas", "biker"],
  "carpa": ["carpa", "carpas", "biker"],
  "bolsas de dormir": ["bolsa", "bolsas", "dormir", "colchon", "colchones", "inflable", "inflador", "aislante"],
  "bolsa de dormir": ["bolsa", "bolsas", "dormir", "colchon", "colchones", "inflable", "inflador", "aislante"],
  "anafes y marmitas": ["anafe", "marmita", "marmitas", "calentador", "parrilla", "pava"],
  "anafe y marmita": ["anafe", "marmita", "marmitas", "calentador", "parrilla", "pava"],
  "iluminacion": ["linterna", "linternas", "farol", "faroles", "iluminacion", "luz", "led", "multi 1000r"]
};

const SUBCATEGORY_PARENT_CATEGORIES = {
  // Pesca
  "canas": "Pesca",
  "cana": "Pesca",
  "reeles": "Pesca",
  "reel": "Pesca",
  "senuelos": "Pesca",
  "senuelo": "Pesca",
  "cajas y bolsos": "Pesca",
  "caja y bolso": "Pesca",
  
  // Caza
  "armas": "Caza",
  "arma": "Caza",
  "municiones": "Caza",
  "municion": "Caza",
  "indumentaria": "Caza",
  "accesorios": "Caza",
  "accesorio": "Caza",
  
  // Náutica
  "kayaks": "Nautica",
  "kayak": "Nautica",
  "chalecos salvavidas": "Nautica",
  "chaleco salvavidas": "Nautica",
  "motores": "Nautica",
  "motor": "Nautica",
  "sogas y anclas": "Nautica",
  "soga y ancla": "Nautica",
  
  // Camping
  "carpas": "Camping",
  "carpa": "Camping",
  "bolsas de dormir": "Camping",
  "bolsa de dormir": "Camping",
  "anafes y marmitas": "Camping",
  "anafe y marmita": "Camping",
  "iluminacion": "Camping"
};

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

  const handleSearchChange = (val) => {
    setLocalQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  };

  const handleClearAll = () => {
    setSelectedCategory("Todos");
    setSortBy('featured');
    setLocalQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
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
      const normalizedQuery = normalizeText(query).trim();
      const keywords = SUBCATEGORY_KEYWORDS[normalizedQuery];

      if (keywords) {
        const parentCategory = SUBCATEGORY_PARENT_CATEGORIES[normalizedQuery];
        result = result.filter(product => {
          // Enforce main category constraint if defined
          if (parentCategory && normalizeText(product.category) !== normalizeText(parentCategory)) {
            return false;
          }

          const nameNormalized = normalizeText(product.name);
          const descNormalized = normalizeText(product.description);
          const catNormalized = normalizeText(product.category);

          return keywords.some(keyword => 
            matchesKeyword(nameNormalized, keyword) || 
            matchesKeyword(descNormalized, keyword) || 
            matchesKeyword(catNormalized, keyword)
          );
        });
      } else {
        result = result.filter(product => 
          normalizeText(product.name).includes(normalizedQuery) || 
          normalizeText(product.category).includes(normalizedQuery) ||
          normalizeText(product.description).includes(normalizedQuery)
        );
      }
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
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full p-2 pl-3 pr-10 border border-neutral-300 dark:border-military-blue-light dark:bg-military-blue-dark dark:text-white rounded focus:outline-none focus:border-hunter-orange transition-colors"
              />
              {localQuery ? (
                <button 
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-hunter-orange dark:hover:text-hunter-orange transition-colors"
                  title="Limpiar búsqueda"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
              )}
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
                onClick={handleClearAll}
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
