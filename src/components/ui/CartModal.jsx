import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop sombreado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-none"
          />

          {/* Panel deslizante */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-military-blue-dark shadow-2xl z-[70] flex flex-col"
          >
            {/* Header del carrito */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-neutral-900" />
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Tu Carrito</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Contenido del carrito */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-neutral-100 dark:border-military-blue-light pb-6 last:border-0 last:pb-0">
                      <div className="w-20 h-24 bg-neutral-100 dark:bg-military-blue flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white line-clamp-2">{item.name}</h3>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-200 dark:border-military-blue-light rounded">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-military-blue-light">-</button>
                            <span className="px-2 py-1 text-sm font-medium dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-military-blue-light">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                  <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
                  <p>Tu carrito está vacío</p>
                </div>
              )}
            </div>

            {/* Footer del carrito */}
            <div className="p-6 border-t border-neutral-200 dark:border-military-blue-light bg-neutral-50 dark:bg-military-blue-dark">
              <div className="flex justify-between items-center mb-6">
                <span className="text-neutral-500 font-medium text-sm">El precio total se acordará por WhatsApp.</span>
              </div>
              <button 
                onClick={handleCheckoutClick}
                disabled={cartItems.length === 0}
                className="w-full bg-hunter-orange text-white font-bold uppercase tracking-wider py-4 hover:bg-hunter-orange-hover transition-colors disabled:opacity-50 disabled:hover:bg-hunter-orange rounded"
              >
                Iniciar Compra
              </button>
              <button 
                onClick={onClose}
                className="w-full text-center mt-4 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium uppercase"
              >
                Seguir Comprando
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
