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
      setProducts(data);
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

  const popularProducts = products.filter(p => !p.isNew).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 12);

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
