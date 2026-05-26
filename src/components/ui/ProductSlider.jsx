import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { staggerContainer } from '../../animations/variants';

export default function ProductSlider({ products }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (!products || products.length === 0) return null;

  const currentProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="relative px-0 md:px-16 max-w-[1400px] mx-auto">
      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-military-blue shadow-lg hover:bg-neutral-100 dark:hover:bg-military-blue-light text-neutral-800 dark:text-white p-2 md:p-3 rounded-full transition-all border border-neutral-200 dark:border-military-blue-light items-center justify-center"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-military-blue shadow-lg hover:bg-neutral-100 dark:hover:bg-military-blue-light text-neutral-800 dark:text-white p-2 md:p-3 rounded-full transition-all border border-neutral-200 dark:border-military-blue-light items-center justify-center"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Grid Container */}
      <div className="overflow-hidden py-4">
        <motion.div
          key={currentPage}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50) handleNext();
            else if (offset.x > 50) handlePrev();
          }}
        >
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
      
      {/* Dots Indicator */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentPage ? 'bg-hunter-orange w-6' : 'bg-neutral-300 dark:bg-military-blue-light w-2 hover:bg-hunter-orange/50'}`}
              aria-label={`Página ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
