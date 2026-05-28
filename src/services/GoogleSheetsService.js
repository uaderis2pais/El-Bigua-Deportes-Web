import Papa from 'papaparse';

/**
 * Servicio para cargar el catálogo desde un archivo CSV.
 * Este CSV puede ser uno local o uno exportado desde Google Sheets publicado en la web.
 */
export const GoogleSheetsService = {
  /**
   * Cambia esta URL por el link de "Publicar en la Web" de tu Google Sheets.
   * Asegurate de que el formato sea "Valores separados por comas (.csv)"
   */
  // GOOGLE_SHEETS_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-xxxx/pub?output=csv',

  // Por ahora usamos el local para pruebas
  GOOGLE_SHEETS_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScqvu43yCjb-MJC-oLej7QorP4cfICpbhgVnSE3PCxdwRE8hJO9zqQBs-1iYyIK1daeOPLG9dlJqWo/pub?gid=0&single=true&output=csv',

  async fetchProducts() {
    try {
      const response = await fetch(this.GOOGLE_SHEETS_CSV_URL);
      const text = await response.text();

      // Encontrar dónde empiezan realmente las columnas (la fila que empieza con "id,")
      const lines = text.split('\n');
      let headerIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().trim().startsWith('id,')) {
          headerIndex = i;
          break;
        }
      }

      const cleanCsv = lines.slice(headerIndex).join('\n');

      return new Promise((resolve, reject) => {
        Papa.parse(cleanCsv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error('Errores al leer el CSV:', results.errors);
            }

            // Formatear los datos para que coincidan con la estructura esperada por React
            // Aceptamos tanto los nombres de columna en inglés como en español
            const formattedProducts = results.data.map(row => {
              const rawIsNew = row.isNew !== undefined ? row.isNew : row.esNuevo;
              const rawIsPopular = row.isPopular !== undefined ? row.isPopular : (row.esPopular !== undefined ? row.esPopular : row.destacado);
              
              // Parsear y dividir categorías por delimitadores (coma, punto, guion bajo, barra, pipe)
              const rawCategory = row.category || row.categoria || 'Otros';
              const parsedCategories = String(rawCategory)
                .split(/[.,_\/|]+/)
                .map(c => c.trim())
                .filter(Boolean);

              const normalizedCategories = parsedCategories.map(cat => {
                const normalized = cat
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase();
                
                if (normalized === 'pesca') return 'Pesca';
                if (normalized === 'caza') return 'Caza';
                if (normalized === 'camping') return 'Camping';
                if (normalized === 'nautica') return 'Nautica';
                
                return cat.charAt(0).toUpperCase() + cat.slice(1);
              });

              const finalCategories = normalizedCategories.length > 0 ? normalizedCategories : ['Otros'];

              return {
                id: parseInt(row.id),
                name: row.name || row.nombre || 'Sin nombre',
                price: parseFloat(row.price || row.precio) || 0,
                category: finalCategories.join(', '),
                categories: finalCategories,
                description: row.description || row.descripcion || '',
                image: row.image || row.imagen || 'https://via.placeholder.com/600x600?text=Sin+Imagen',
                isNew: String(rawIsNew).trim().toLowerCase() === 'true' || rawIsNew === 1 || rawIsNew === true || String(rawIsNew).trim().toUpperCase() === 'TRUE',
                isPopular: rawIsPopular !== undefined ? (String(rawIsPopular).trim().toLowerCase() === 'true' || rawIsPopular === 1 || rawIsPopular === true || String(rawIsPopular).trim().toUpperCase() === 'TRUE') : false
              };
            }).filter(product => !isNaN(product.id)); // Filtrar filas inválidas

            resolve(formattedProducts);
          },
          error: (error) => {
            console.error('Error cargando el catálogo:', error);
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error al descargar o procesar el CSV:', error);
      return [];
    }
  }
};
