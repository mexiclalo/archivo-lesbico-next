'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Footer() {
  const params = useParams();
  const lang = params?.lang || 'es';

  return (
    <footer className="bg-[#2A1346] text-white py-12 px-6 font-sans border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-tabla-amarillo mb-4">
              {lang === 'es' ? 'Feminismo Socialista' : 'Socialist Feminism'}
            </h3>
            <p className="text-gray-500">
              {lang === 'es' 
                ? 'Recopilación de textos para el estudio y la difusión del feminismo socialista.' 
                : 'Collection of texts for the study and dissemination of socialist feminism.'}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {lang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}#inicio`} className="hover:text-white transition-colors duration-300">{lang === 'es' ? 'Inicio' : 'Home'}</Link></li>
              <li><Link href={`/${lang}/libros`} className="hover:text-white transition-colors duration-300">{lang === 'es' ? 'Libros' : 'Books'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <p>contacto@yanmaria.org</p>
          </div>
        </div>
      </div>
      <div className="bg-black py-4">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {lang === 'es' ? 'Feminismo Socialista' : 'Socialist Feminism'}. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}
