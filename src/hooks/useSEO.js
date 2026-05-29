import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado para manejar metatags SEO (Título, Descripción y URL Canónica) de forma dinámica.
 */
export default function useSEO({ title, description, canonicalUrl } = {}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Título de la pestaña
    if (title) {
      document.title = title;
    }

    // 2. Meta Descripción
    if (description) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Enlace Canónico
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    
    // Si no se pasa URL canónica explícita, se genera una automática basándose en la ruta actual
    const canonical = canonicalUrl || `https://el-bigua-deportes-web.vercel.app${location.pathname}`;
    link.setAttribute('href', canonical);
  }, [title, description, canonicalUrl, location.pathname]);
}
