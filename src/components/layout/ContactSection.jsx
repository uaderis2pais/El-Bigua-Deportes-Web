import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-neutral-100 dark:bg-military-blue py-16 border-t border-neutral-200 dark:border-military-blue-light transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Info del Cliente */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-wider mb-2 text-neutral-900 dark:text-white">Visitanos</h2>
              <div className="w-16 h-1 bg-hunter-orange mb-6"></div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
                Vení a conocer nuestro local fisico. Tenemos todo lo que necesitas para tu próxima aventura al aire libre con el mejor asesoramiento personalizado.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-hunter-orange/10 dark:bg-military-blue-light p-3 rounded-full text-hunter-orange flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-200 uppercase text-sm mb-1">Ubicación</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">EVA PERON 85, CP 3260<br />Concepción del Uruguay, Entre Ríos</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-hunter-orange/10 dark:bg-military-blue-light p-3 rounded-full text-hunter-orange flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-200 uppercase text-sm mb-1">WhatsApp / Telefono fijo</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">+54 9 3442 54-3253<br></br>428985</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-hunter-orange/10 dark:bg-military-blue-light p-3 rounded-full text-hunter-orange flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-200 uppercase text-sm mb-1">Email</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">jjaguirre.elbigua@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-hunter-orange/10 dark:bg-military-blue-light p-3 rounded-full text-hunter-orange flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-200 uppercase text-sm mb-1">Horarios de Atención</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">Lunes a Sábados: 08:30 a 12:15 y de 16:30 a 20:00<br />Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Iframe */}
          <div className="h-[400px] lg:h-full min-h-[400px] w-full bg-neutral-200 rounded-lg overflow-hidden shadow-lg border border-neutral-300">
            <iframe
              src="https://maps.google.com/maps?q=EVA%20PERON%2085%2C%20Concepcion%20del%20Uruguay%2C%20Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de El Biguá"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
