import useSEO from '../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contacto | El Biguá Deportes',
    description: 'Contactanos por WhatsApp o visitanos en Concepción del Uruguay, Entre Ríos para obtener el mejor asesoramiento en pesca, caza y camping.'
  });
  return (
    <div className="min-h-[50vh] flex items-center justify-center py-20 px-4 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">Contacto</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-lg mx-auto">Estamos trabajando en nuestra página de contacto para brindarte la mejor atención.</p>
        <div className="w-16 h-1 bg-emerald-500 mx-auto"></div>
      </div>
    </div>
  );
}
