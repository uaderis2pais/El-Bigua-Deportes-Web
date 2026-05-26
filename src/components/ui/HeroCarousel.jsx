import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    image: "/carrusel/bigua2carrusel.jpg",
    title: "Bienvenidos a El Biguá. Tu pasión por el río y la naturaleza",
    cta: "Ver Catálogo",
    path: "/catalog"
  },
  {
    id: 2,
    image: "/carrusel/pesca2carrusel.jpg",
    title: "Desafía las aguas con el mejor equipamiento de pesca",
    cta: "Explorar Pesca",
    path: "/catalog?category=Pesca"
  },
  {
    id: 3,
    image: "/carrusel/campingCarrusel.webp",
    title: "Acampá sin límites. Preparate para la naturaleza extrema",
    cta: "Explorar Camping",
    path: "/catalog?category=Camping"
  },
  {
    id: 4,
    image: "/carrusel/cazaCarrusel.webp",
    title: "Precisión y seguridad en tu equipo de caza",
    cta: "Explorar Caza",
    path: "/catalog?category=Caza"
  },
  {
    id: 5,
    image: "/carrusel/nautica2Carrusel.jpeg",
    title: "Navega tu propia aventura con nuestros accesorios náuticos",
    cta: "Explorar Náutica",
    path: "/catalog?category=Nautica"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50) handleNext();
            else if (offset.x > 50) handlePrev();
          }}
        >
          <img
            src={SLIDES[currentIndex].image}
            alt={SLIDES[currentIndex].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-16">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 max-w-4xl leading-tight"
            >
              {SLIDES[currentIndex].title}
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link to={SLIDES[currentIndex].path} className="bg-hunter-orange text-white font-bold uppercase text-sm px-8 py-4 tracking-wider hover:bg-hunter-orange-hover transition-colors inline-block">
                {SLIDES[currentIndex].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-hunter-orange w-8' : 'bg-white/50 hover:bg-white/80 w-3'}`}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
