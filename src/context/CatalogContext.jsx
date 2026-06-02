import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleSheetsService } from '../services/GoogleSheetsService';

const CatalogContext = createContext();

export const useCatalog = () => {
  return useContext(CatalogContext);
};

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatalog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await GoogleSheetsService.fetchProducts();
      // Ordenar por ID descendente (del más nuevo al más viejo)
      const sortedData = [...data].sort((a, b) => b.id - a.id);
      setProducts(sortedData);
    } catch (err) {
      setError('Error al cargar el catálogo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // Calcular productos populares dinámicamente
  const manuallyMarked = products.filter(p => p.isPopular);
  const getPopularityScore = (p) => (p.clicks || 0) + (p.cartAdditions || 0) * 5;
  const remainingProducts = products.filter(p => !p.isPopular);
  
  // Ordenar el resto de productos por popularidad (clicks + compras*5)
  const sortedByPopularity = [...remainingProducts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a));
  
  // Detectar si hay interacciones registradas en el catálogo
  const hasInteraction = products.some(p => (p.clicks || 0) > 0 || (p.cartAdditions || 0) > 0);
  
  let popularProducts = [];
  if (manuallyMarked.length >= 4) {
    popularProducts = manuallyMarked.slice(0, 4);
  } else {
    const needed = 4 - manuallyMarked.length;
    const fillers = hasInteraction
      ? sortedByPopularity.slice(0, needed)
      : remainingProducts.filter(p => !p.isNew).slice(0, needed);
    popularProducts = [...manuallyMarked, ...fillers];
  }

  const newProducts = products.filter(p => p.isNew).slice(0, 16);

  const value = {
    products,
    popularProducts,
    newProducts,
    isLoading,
    error,
    refreshCatalog: fetchCatalog
  };

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
