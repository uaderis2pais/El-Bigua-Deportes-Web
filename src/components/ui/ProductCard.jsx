import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../animations/variants';
import { useCart } from '../../context/CartContext';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evitar navegar
    addToCart(product);
    setIsAdded(true);
    toast.success('¡Producto añadido al carrito!');
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div variants={fadeIn} className="group cursor-pointer">
      <Link to={`/producto/${product.id}`} className="block relative aspect-[4/5] bg-white dark:bg-military-blue border border-neutral-100 dark:border-military-blue-light shadow-sm hover:shadow-2xl transition-all duration-500 mb-4 overflow-hidden rounded-2xl group-hover:-translate-y-1">
        {product.isNew && <span className="absolute top-3 left-3 bg-hunter-orange text-white text-[10px] font-bold uppercase px-2 py-1 z-10 rounded-sm tracking-wider">New</span>}
        
        <div className="w-full h-full p-6 flex items-center justify-center bg-neutral-50 dark:bg-black/20">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm" 
          />
        </div>
        <button 
          onClick={handleAddToCart}
          className={`absolute bottom-4 left-4 right-4 font-bold text-sm py-3 transition-all duration-300 shadow-lg hidden md:flex items-center justify-center gap-2 uppercase z-20
            ${isAdded 
              ? 'bg-green-600 text-white opacity-100 translate-y-0' 
              : 'bg-hunter-orange text-white opacity-0 group-hover:opacity-100 hover:bg-hunter-orange-hover'}`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" /> Agregado
            </>
          ) : (
            'Añadir al carrito'
          )}
        </button>
      </Link>
      <div className="text-left mt-2">
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-sm md:text-base font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2 min-h-[3rem] mb-2 group-hover:text-hunter-orange transition-colors">{product.name}</h3>
        </Link>
      </div>
    </motion.div>
  );
}
