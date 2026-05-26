import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
  const { cartItems, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', city: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    let message = `¡Hola El Biguá! Quiero realizar el siguiente pedido:\n\n*Datos del Cliente:*\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nDirección: ${formData.address}, ${formData.city}\n\n*Pedido:*\n`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name}\n`;
    });
    message += `\n¿Me confirmarían disponibilidad y precio total?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5493442668753?text=${encodedMessage}`, '_blank');
    
    clearCart();
    setShowConfirmModal(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <button onClick={() => navigate('/catalog')} className="text-hunter-orange font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 dark:text-white">Finalizar Compra</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Formulario */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
          <div className="bg-neutral-50 dark:bg-military-blue-dark p-6 md:p-8 rounded-xl border border-neutral-200 dark:border-military-blue-light">
            <h2 className="font-display text-xl font-bold mb-6 uppercase dark:text-white">Tus Datos</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nombre Completo</label>
                <input required type="text" name="name" onChange={handleInputChange} className="w-full p-3 border border-neutral-300 dark:border-military-blue-light dark:bg-military-blue-dark dark:text-white rounded focus:outline-none focus:border-hunter-orange dark:focus:border-hunter-orange transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Teléfono (WhatsApp)</label>
                <input required type="tel" name="phone" onChange={handleInputChange} className="w-full p-3 border border-neutral-300 dark:border-military-blue-light dark:bg-military-blue-dark dark:text-white rounded focus:outline-none focus:border-hunter-orange dark:focus:border-hunter-orange transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Dirección de Envío</label>
                  <input required type="text" name="address" onChange={handleInputChange} className="w-full p-3 border border-neutral-300 dark:border-military-blue-light dark:bg-military-blue-dark dark:text-white rounded focus:outline-none focus:border-hunter-orange dark:focus:border-hunter-orange transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Ciudad</label>
                  <input required type="text" name="city" onChange={handleInputChange} className="w-full p-3 border border-neutral-300 dark:border-military-blue-light dark:bg-military-blue-dark dark:text-white rounded focus:outline-none focus:border-hunter-orange dark:focus:border-hunter-orange transition-colors" />
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Resumen */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[400px]">
          <div className="bg-white dark:bg-military-blue-dark p-6 md:p-8 rounded-xl border border-neutral-200 dark:border-military-blue-light shadow-sm sticky top-28">
            <h2 className="font-display text-xl font-bold mb-6 uppercase dark:text-white">Resumen del Pedido</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3 w-full justify-between">
                    <span className="font-bold text-neutral-400">{item.quantity}x</span>
                    <span className="font-medium line-clamp-1 flex-1 text-right">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-4 mb-8">
              <div className="flex flex-col text-sm text-neutral-500">
                <span>Total de ítems: {cartCount}</span>
                <span className="mt-2 text-hunter-orange font-bold uppercase text-xs">El precio y disponibilidad se consultarán vía WhatsApp</span>
              </div>
            </div>
            <button type="submit" form="checkout-form" className="w-full bg-hunter-orange text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-hunter-orange-hover transition-colors">
              Enviar Pedido por WhatsApp
            </button>
            <p className="text-xs text-center text-neutral-500 mt-4">
              Serás redirigido a WhatsApp para confirmar los detalles de pago y envío directamente con nosotros.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal de Confirmación */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-military-blue-dark rounded-xl shadow-2xl max-w-md w-full p-6 border border-neutral-200 dark:border-military-blue-light"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-white mb-2">¿Confirmar Pedido?</h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Serás redirigido a WhatsApp para enviar los detalles de tu compra. 
                  <br /><br />
                  <strong className="text-neutral-900 dark:text-white">Tu carrito actual se vaciará</strong> para que puedas comenzar una nueva compra luego.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 bg-neutral-100 dark:bg-military-blue hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="flex-1 py-3 px-4 bg-hunter-orange hover:bg-hunter-orange-hover text-white font-bold rounded transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
