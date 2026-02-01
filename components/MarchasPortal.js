'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MarchasPortal({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  if (!t) return null;

  return (
    <section 
      id="marchas-portal"
      className="relative w-full min-h-[70svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #A165C8, #63009B)'
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center space-y-12 px-6 w-full">
        
        {/* Título Grande */}
        <h2 
          className="text-white text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase drop-shadow-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.title}
        </h2>

        {/* Imagen Central Amplia */}
        <div className="w-full max-w-4xl">
          <img 
            src="https://archivolesbico.yanmaria.org/img/pantallaGrande/portada/fondoMarchasLesbicaVertical.png"
            alt={t.title}
            className="w-full h-auto max-h-[40svh] object-contain drop-shadow-lg rounded-sm"
          />
        </div>

        {/* Botón Entrar */}
        <Link 
          href={`/${lang}/marchas`}
          className="px-12 py-4 bg-[#8C0DC2] text-white text-sm font-bold uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-[#791E8F] hover:scale-105 active:scale-95 transition-all border border-white/20"
        >
          {t.button}
        </Link>
      </div>
    </section>
  );
}