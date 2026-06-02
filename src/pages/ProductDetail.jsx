import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import useSEO from '../hooks/useSEO';
import { trackEvent } from '../utils/analytics';
import { tracker } from '../utils/tracker';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useCatalog();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  useSEO({
    title: product ? `${product.name} | El Biguá Deportes` : 'Producto no encontrado | El Biguá Deportes',
    description: product ? `${product.description || 'Equipamiento de alta calidad diseñado para soportar las condiciones más exigentes. Consultá precio y disponibilidad vía WhatsApp.'}` : 'El producto solicitado no fue encontrado en nuestro catálogo dinámico.',
    canonicalUrl: product ? `https://el-bigua-deportes-web.vercel.app/producto/${product.id}` : undefined
  });

  React.useEffect(() => {
    if (product) {
      trackEvent('view_item', {
        currency: 'ARS',
        value: product.price || 0,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price || 0,
            quantity: 1
          }
        ]
      });
      
      // Registrar interacción (click/vista) en el Excel
      tracker.trackProduct(product.id, 'click');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate('/catalog')} className="text-hunter-orange font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    toast.success('¡Producto añadido al carrito!');
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <button onClick={() => navigate(-1)} className="text-neutral-500 font-medium hover:text-hunter-orange flex items-center gap-2 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Atrás
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-square bg-neutral-100 rounded-xl overflow-hidden relative">
          {product.isNew && <span className="absolute top-4 left-4 bg-hunter-orange text-white text-xs font-bold uppercase px-3 py-1 z-10">New</span>}
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        {/* Detalles */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
          <span className="text-hunter-orange font-bold tracking-widest text-sm mb-2 uppercase">{product.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">{product.name}</h1>
          <div className="text-sm font-bold text-hunter-orange mb-6 bg-hunter-orange/10 inline-block px-4 py-2 rounded uppercase tracking-wider">
            El precio y la disponibilidad se consultan al momento final de la compra
          </div>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            {product.description || "Equipamiento de alta calidad diseñado para soportar las condiciones más exigentes. Perfecto para tu próxima aventura al aire libre."}
          </p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Cantidad</label>
              <div className="flex items-center border border-neutral-300 dark:border-military-blue-light rounded h-12">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full hover:bg-neutral-100 dark:hover:bg-military-blue-light transition-colors">-</button>
                <span className="w-12 text-center font-medium dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full hover:bg-neutral-100 dark:hover:bg-military-blue-light transition-colors">+</button>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className={`flex-1 h-12 mt-6 font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded transition-all duration-300
                ${isAdded ? 'bg-green-600 text-white' : 'bg-hunter-orange text-white hover:bg-hunter-orange-hover'}`}
            >
              {isAdded ? <><Check className="w-5 h-5" /> Agregado</> : <><ShoppingCart className="w-5 h-5" /> Añadir al carrito</>}
            </button>
          </div>

          <div className="border-t border-neutral-200 pt-6 mt-6">
            <ul className="text-sm text-neutral-500 space-y-2">
              <li>✓ Envío disponible a todo el país</li>
              <li>✓ Garantía oficial del fabricante</li>
              <li>✓ Pago seguro coordinado con el local</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
