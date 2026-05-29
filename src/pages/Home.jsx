import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import ProductSlider from '../components/ui/ProductSlider';
import HeroCarousel from '../components/ui/HeroCarousel';
import { useCatalog } from '../context/CatalogContext';
import { fadeIn, staggerContainer } from '../animations/variants';

import useSEO from '../hooks/useSEO';

export default function Home() {
  const { popularProducts, newProducts, isLoading } = useCatalog();

  useSEO({
    title: 'El Biguá Deportes | Pesca, Caza, Náutica y Camping – Concepción del Uruguay',
    description: 'Tienda especializada en artículos de pesca, caza, náutica y camping en Concepción del Uruguay, Entre Ríos. Reeles, cañas, señuelos, carpas, municiones y más. Consultá por WhatsApp.'
  });

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <HeroCarousel />

      {/* SOBRE NOSOTROS */}
      <section className="py-20 bg-white dark:bg-military-blue-dark border-b border-neutral-200 dark:border-military-blue-light transition-colors">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black uppercase tracking-wider mb-2 dark:text-white">Sobre Nosotros</h2>
              <div className="w-16 h-1 bg-hunter-orange"></div>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                Somos <span className="font-logo text-2xl text-military-blue dark:text-white ml-1">el Biguá</span>, tu tienda de confianza en Concepción del Uruguay. Nos especializamos en la venta minorista de artículos para el cazador y pescador deportivo, así como también accesorios náuticos y todo lo necesario para camping.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                Brindamos asesoramiento experto para que cada una de tus aventuras al aire libre sea inolvidable. Además, contamos con servicio de Gestoría del Registro Nacional de Armas.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/frente.webp" 
                alt="Frente del local El Biguá" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-military-blue-dark/20 mix-blend-multiply"></div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* NOVEDADES / PRODUCT GRID */}
      <section className="py-20 max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-wider mb-2 dark:text-white">Novedades</h2>
          <div className="w-16 h-1 bg-hunter-orange mx-auto"></div>
        </div>
        <ProductSlider products={newProducts} />
      </section>

      {/* PRODUCTOS POPULARES */}
      <section className="py-10 max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-wider mb-2 dark:text-white">Articulos Populares</h2>
          <div className="w-16 h-1 bg-hunter-orange mx-auto"></div>
        </div>
        <motion.div
          key={popularProducts.length}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>

      {/* GALERÍA DE LA TIENDA */}
      <section className="py-20 bg-neutral-50 dark:bg-military-blue-dark border-b border-neutral-200 dark:border-military-blue-light transition-colors">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-wider mb-2 dark:text-white">Conocé Nuestra Tienda</h2>
            <div className="w-16 h-1 bg-hunter-orange mx-auto"></div>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">Visitanos en nuestro local para encontrar la mejor variedad de artículos y recibir asesoramiento personalizado.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 h-64 md:h-auto relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img src="/dentro1.webp" alt="Interior de la tienda El Biguá" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="h-64 relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img src="/cartel.webp" alt="Cartel de El Biguá" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="h-64 relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img src="/dentro2.webp" alt="Artículos de pesca y caza" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              className="h-64 relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img src="/dentro3.webp" alt="Indumentaria y accesorios" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2 h-64 relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img src="/dentro4.webp" alt="Más artículos del local" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
