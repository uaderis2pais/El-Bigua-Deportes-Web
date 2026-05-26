import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const FAQS = [
  {
    question: "¿Por qué no veo los precios en la página?",
    answer: "Nuestro catálogo se actualiza constantemente. Para ofrecerte el mejor precio y confirmarte la disponibilidad real, te pedimos que sumes los productos que te interesan al carrito y nos envíes el pedido. Te responderemos al instante por WhatsApp con la cotización exacta."
  },
  {
    question: "¿Cómo realizo una compra?",
    answer: "¡Es muy simple! Agregá los productos que desees al carrito y al finalizar la selección presioná 'Iniciar Compra'. Esto armará un mensaje automático con tu pedido para enviárnoslo por WhatsApp, donde coordinaremos el pago y la entrega."
  },
  {
    question: "¿Cuáles son los métodos de envío y pago?",
    answer: "Realizamos envíos a todo el país. Tanto el método de envío como las formas de pago (efectivo, transferencia o tarjetas) se acordarán directamente de forma segura por WhatsApp al momento de confirmar tu pedido."
  },
  {
    question: "¿Los productos tienen garantía?",
    answer: "Sí, todos nuestros productos cuentan con garantía oficial de fábrica por defectos de fabricación."
  },
  {
    question: "¿Tienen local físico para ver los productos?",
    answer: "¡Sí! Podés visitarnos en nuestro local ubicado en EVA PERON 85, Concepción del Uruguay. Te recomendamos armar tu carrito y confirmarnos disponibilidad por WhatsApp antes de venir."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    if (!e.isTrusted) {
      console.warn('Bot detected');
      return;
    }
    const realNumber = ['549', '3442', '543253'].join('');
    window.open(`https://wa.me/${realNumber}`, '_blank', 'noopener,noreferrer');
  };
  const location = useLocation();

  if (location.pathname !== '/') return null;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div id="faq" className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-screen-md mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">Preguntas Frecuentes</h1>
        <p className="text-neutral-500 text-lg">Resuelve tus dudas rápidamente y prepárate para tu próxima aventura.</p>
        <div className="w-16 h-1 bg-hunter-orange mx-auto mt-6"></div>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="border border-neutral-200 dark:border-military-blue-light bg-white dark:bg-military-blue-dark rounded-lg overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="font-bold text-neutral-900 dark:text-white pr-8">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-hunter-orange flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-5 pt-0 text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-military-blue-light/50">
                    <p className="mt-4">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-neutral-100 dark:bg-military-blue-light/30 p-8 rounded-xl">
        <h3 className="font-display font-bold text-xl mb-2 dark:text-white">¿No encontraste lo que buscabas?</h3>
        <p className="text-neutral-500 mb-6">Estamos aquí para ayudarte a elegir el mejor equipamiento.</p>
        <a
          href="https://wa.me/5493442000000"
          onClick={handleWhatsAppRedirect}
          className="inline-block bg-hunter-orange text-white font-bold py-3 px-8 rounded hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  );
}
