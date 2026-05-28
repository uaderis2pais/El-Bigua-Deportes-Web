import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    if (!e.isTrusted) {
      console.warn('Bot detected');
      return;
    }
    const realNumber = ['549', '3442', '543253'].join('');
    window.open(`https://wa.me/${realNumber}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-military-blue-dark text-white pt-16 pb-8 border-t-4 border-hunter-orange">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">

          {/* Columna 1: Marca y Redes */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex flex-col items-start group mb-6">
              <span className="font-logo text-4xl leading-none text-white group-hover:text-hunter-orange transition-colors">el Biguá</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 mt-1 uppercase group-hover:text-hunter-orange/80 transition-colors">Caza - Pesca - Nautica - Camping</span>
            </Link>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              Venta minorista de artículos para el cazador y pescador deportivo. Accesorios náuticos y camping. Gestoría Registro Nacional de Armas.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/elbiguadeportes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hunter-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://www.facebook.com/share/17e2mRckfG/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hunter-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://wa.me/5493442000000" onClick={handleWhatsAppRedirect} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hunter-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Categorías */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider mb-6 text-hunter-orange">Categorías</h3>
            <ul className="space-y-3">
              <li><Link to="/catalog?category=Pesca" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2"><span className="w-1 h-1 bg-hunter-orange rounded-full"></span>Pesca</Link></li>
              <li><Link to="/catalog?category=Caza" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2"><span className="w-1 h-1 bg-hunter-orange rounded-full"></span>Caza</Link></li>
              <li><Link to="/catalog?category=Nautica" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2"><span className="w-1 h-1 bg-hunter-orange rounded-full"></span>Náutica</Link></li>
              <li><Link to="/catalog?category=Camping" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2"><span className="w-1 h-1 bg-hunter-orange rounded-full"></span>Camping</Link></li>
              <li><Link to="/catalog" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2"><span className="w-1 h-1 bg-hunter-orange rounded-full"></span>Ver Todo</Link></li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Útiles */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider mb-6 text-hunter-orange">Enlaces Útiles</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-neutral-400 hover:text-white transition-colors text-sm">Sobre Nosotros</Link></li>
              <li><a href="/#faq" className="text-neutral-400 hover:text-white transition-colors text-sm">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider mb-6 text-hunter-orange">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin className="w-5 h-5 text-hunter-orange flex-shrink-0" />
                <span>EVA PERON 85<br />Concepción del Uruguay (Cdelu)</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Phone className="w-5 h-5 text-hunter-orange flex-shrink-0" />
                <span>549 3442 54-3253 / 428985</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Mail className="w-5 h-5 text-hunter-orange flex-shrink-0" />
                <span>jjaguirre.elbigua@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} El Biguá Deportes. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span>
              Diseñado y desarrollado por <a href="https://www.linkedin.com/in/facundo-bautista-pais" target="_blank" rel="noopener noreferrer" className="hover:text-hunter-orange font-medium transition-colors">@Facundo Pais</a> para El Biguá Deportes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
