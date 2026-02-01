'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function Portada({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  // Estilos limpios
  const heroStyle = {
    backgroundColor: '#291147',
    textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
    minHeight: '100svh', // Altura estable que ignora la barra de direcciones
    height: '100svh',
  };

  if (!t) return <div className="min-h-[100svh] h-[100svh] bg-[#291147]"></div>;

  // Función para evitar que las palabras con guiones se rompan
  const preventBreak = (text) => {
    if (!text) return '';
    // Reemplaza guión normal por Non-breaking hyphen (U+2011)
    return text.replace(/-/g, '\u2011');
  };

  const titleHtmlNoBreak = preventBreak(t.titleHtml);

  return (
    <section 
      id="inicio"
      className="w-full flex items-center justify-center p-4 font-sans relative overflow-hidden"
      style={heroStyle}
    >
      {/* Capas de degradado sutil para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
      
      <div className="relative text-white text-center w-full max-w-[1400px] -translate-y-10 md:-translate-y-[90px] px-4 flex flex-col items-center">
        {/* Logo AHMFLM-YMY */}
        <img 
          src="https://archivolesbico.yanmaria.org/img/AHMLFM-YMY_morado.png" 
          alt="Logo AHMFLM-YMY" 
          className="w-[150px] md:w-[200px] h-auto mb-8 drop-shadow-lg"
        />

        <h1 
          className="text-lg md:text-2xl font-bold uppercase tracking-[0.15em] leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
          dangerouslySetInnerHTML={{ __html: titleHtmlNoBreak }}
        >
        </h1>
        
        <h2 className="text-xs md:text-base font-light tracking-[0.25em] uppercase opacity-70 mb-8">
          {t.subtitleHtml}
        </h2>

        {/* Imagen Pies Blancos respetando sus píxeles originales */}
        <img 
          src="https://archivolesbico.yanmaria.org/img/pies-blancos-baja.png" 
          alt="Icono Pies" 
          className="w-auto max-w-[400px] md:max-w-[800px] h-auto opacity-90 drop-shadow-md"
        />
      </div>
    </section>
  );
}