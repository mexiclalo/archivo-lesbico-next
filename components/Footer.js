'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Footer({ dict }) {
  const params = useParams();
  const lang = params?.lang || 'es';
  const t = dict?.home?.footer;
  const nav = dict?.navigation;

  if (!t) return null;

  return (
    <footer className="bg-[#2A1346] text-white py-16 px-6 font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Columna 1: Certificados */}
        <div className="space-y-6">
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-3">
            {t.copyrightTitle}
          </h3>
          <ul className="space-y-3">
            {t.certificates.map((cert, idx) => (
              <li key={idx}>
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] md:text-xs opacity-60 hover:opacity-100 hover:text-[#A165C8] transition-all leading-relaxed block"
                >
                  {cert.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="space-y-6">
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-3">
            {t.quickLinksTitle}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <li><Link href={`/${lang}`} className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-all">➤ {nav.home}</Link></li>
            <li><Link href={`/${lang}/documentos`} className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-all">➤ {nav.documents}</Link></li>
            <li><Link href={`/${lang}/marchas`} className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-all">➤ {nav.marches}</Link></li>
            <li><Link href={`/${lang}/indoafroasia`} className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-all">➤ {nav.indoafroasia}</Link></li>
            <li><Link href={`/${lang}/eventos`} className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-all">➤ {nav.events}</Link></li>
          </ul>
        </div>

        {/* Columna 3: Nombre y Contacto */}
        <div className="flex flex-col space-y-8 lg:text-right lg:items-end">
          <div className="space-y-2">
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-90 leading-tight">
              {t.pageName}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#A165C8]">
              {t.contactTitle}
            </h4>
            <a 
              href={`mailto:${t.contactEmail}`}
              className="text-sm md:text-base font-medium hover:text-[#A165C8] transition-all break-all"
            >
              {t.contactEmail}
            </a>
          </div>
        </div>

      </div>

      {/* Frase de Cierre Final */}
      <div className="mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">
          AHMFLM-YMY —— {t.rights} —— {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
