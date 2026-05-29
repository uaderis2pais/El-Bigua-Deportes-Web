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
            const formattedProducts = [];

            results.data.forEach((row, index) => {
              // Ignorar filas completamente vacías (muy común al exportar hojas de Google)
              const hasAnyData = Object.values(row).some(val => val !== null && val !== undefined && String(val).trim() !== '');
              if (!hasAnyData) return;

              const rawId = row.id;
              const rawName = row.name !== undefined ? row.name : row.nombre;
              const rawPrice = row.price !== undefined ? row.price : row.precio;
              const rawCategory = row.category !== undefined ? row.category : row.categoria;
              const rawDescription = row.description !== undefined ? row.description : row.descripcion;
              const rawImage = row.image !== undefined ? row.image : row.imagen;
              const rawIsNew = row.isNew !== undefined ? row.isNew : row.esNuevo;
              const rawIsPopular = row.isPopular !== undefined ? row.isPopular : (row.esPopular !== undefined ? row.esPopular : row.destacado);

              const isEmpty = (val) => {
                if (val === undefined || val === null) return true;
                if (typeof val === 'string' && val.trim() === '') return true;
                return false;
              };

              const missingFields = [];
              if (isEmpty(rawId) || isNaN(parseInt(rawId))) missingFields.push('id');
              if (isEmpty(rawName)) missingFields.push('nombre/name');
              if (isEmpty(rawPrice) || isNaN(parseFloat(rawPrice))) missingFields.push('precio/price');
              if (isEmpty(rawCategory)) missingFields.push('categoria/category');
              if (isEmpty(rawDescription)) missingFields.push('descripcion/description');
              if (isEmpty(rawImage)) missingFields.push('imagen/image');

              if (missingFields.length > 0) {
                // Fila CSV es index + 2 (1 de encabezado, 1 por índice base 0)
                const rowIdentifier = !isEmpty(rawId) ? `ID: ${rawId}` : `Fila CSV: ${index + 2}`;
                console.warn(`[Catálogo] Producto ignorado por campos incompletos (${rowIdentifier}). Campos faltantes: ${missingFields.join(', ')}`);
                return;
              }

              // Parsear y dividir categorías por delimitadores (coma, punto, guion bajo, barra, pipe)
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

              formattedProducts.push({
                id: parseInt(rawId),
                name: String(rawName).trim(),
                price: parseFloat(rawPrice),
                category: finalCategories.join(', '),
                categories: finalCategories,
                description: String(rawDescription).trim(),
                image: String(rawImage).trim(),
                isNew: String(rawIsNew).trim().toLowerCase() === 'true' || rawIsNew === 1 || rawIsNew === true || String(rawIsNew).trim().toUpperCase() === 'TRUE',
                isPopular: rawIsPopular !== undefined ? (String(rawIsPopular).trim().toLowerCase() === 'true' || rawIsPopular === 1 || rawIsPopular === true || String(rawIsPopular).trim().toUpperCase() === 'TRUE') : false
              });
            }); // Filtrar filas inválidas

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
