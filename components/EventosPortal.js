'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EventosPortal({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  if (!t) return null;

  return (
    <section 
      id="eventos-portal"
      className="relative w-full min-h-[70svh] flex flex-col md:flex-row overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #A165C8, #63009B)'
      }}
    >
      {/* COLUMNA IZQUIERDA (70%): Anuncios y Eventos */}
      <div className="w-full md:w-[70%] p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-12 border-r border-white/10">
        
        {/* Título */}
        <h2 
          className="text-white text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase drop-shadow-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.title}
        </h2>

        {/* Imagen Horizontal */}
        <div className="w-full max-w-4xl">
          <img 
            src="https://archivolesbico.yanmaria.org/Anuncios-y-eventos/img/Anuncios-y-eventos-proximos-horizontal.png"
            alt="Próximos Eventos"
            className="w-full h-auto drop-shadow-lg rounded-sm"
          />
        </div>

        {/* Botón Entrar */}
        <Link 
          href={`/${lang}/eventos`}
          className="px-12 py-4 bg-[#8C0DC2] text-white text-sm font-bold uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-[#791E8F] hover:scale-105 active:scale-95 transition-all border border-white/20"
        >
          {t.button}
        </Link>
      </div>

      {/* COLUMNA DERECHA (30%): Nociones Básicas (Padding reducido para imagen más grande) */}
      <div className="w-full md:w-[30%] p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-8 bg-black/10">
        
        {/* Imagen que parpadea ocupando más espacio */}
        <div className="w-full max-w-[450px] relative">
          <img 
            src="https://archivolesbico.yanmaria.org/Documentos-relevantes/img/LESBOFEMINISMO-NOCIONES_BASICAS.jpg"
            alt="Nociones Básicas"
            className="w-full h-auto object-cover animate-pulse-fast shadow-2xl rounded-sm border-4 border-[#62009A]"
          />
        </div>

        {/* Texto Descriptivo */}
        <div className="space-y-3 text-white px-2">
          <p className="text-base md:text-lg font-bold tracking-wider leading-tight">
            {t.rightTitle}
          </p>
          <p className="text-sm md:text-base opacity-80 italic">
            {t.rightAuthor}
          </p>
        </div>

        {/* Botón Entrar Secundario */}
        <Link 
          href={`/${lang}/documentos`}
          className="px-8 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white/20 transition-all border border-white/30"
        >
          {t.button}
        </Link>

        {/* Estilos para la animación de parpadeo */}
        <style jsx>{`
          @keyframes pulse-fast {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .animate-pulse-fast {
            animation: pulse-fast 2.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
