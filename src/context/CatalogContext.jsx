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

  const markedPopular = products.filter(p => p.isPopular);
  const popularProducts = markedPopular.length > 0 
    ? markedPopular.slice(0, 4) 
    : products.filter(p => !p.isNew).slice(0, 4);
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
