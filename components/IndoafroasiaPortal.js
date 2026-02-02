'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function IndoafroasiaPortal({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  if (!t) return null;

  return (
    <section 
      id="indoafroasia-portal"
      className="relative w-full py-20 md:py-0 md:min-h-[70svh] flex items-center justify-center overflow-hidden"
    >
      {/* Fondo de Imagen (Cover) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://archivolesbico.yanmaria.org/Indoafroasialatinoamerica/img/portada.jpg')`,
        }}
      >
        {/* Velo negro al 40% */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-10 px-6 w-full">
        {/* Título: Ajustado a text-xl en móvil para que quepa la palabra larga */}
        <h2 
          className="text-white text-xl md:text-5xl font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase drop-shadow-2xl break-words max-w-full"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.title}
        </h2>
        
        <Link 
          href={`/${lang}/indoafroasia`}
          className="px-12 py-4 bg-[#8C0DC2] text-white text-sm font-bold uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-[#791E8F] hover:scale-105 active:scale-95 transition-all border border-white/20"
        >
          {t.button}
        </Link>
      </div>
    </section>
  );
}