'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function Portada({ t }) {
  const [showArrow, setShowArrow] = useState(true);
  const topRef = useRef(null);
  const params = useParams();
  const lang = params?.lang || 'es';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (topRef.current) {
      observer.observe(topRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const heroStyle = {
    backgroundColor: '#291147',
    textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
    minHeight: '100svh',
    height: '100svh',
  };

  if (!t) return <div className="min-h-[100svh] h-[100svh] bg-[#291147]"></div>;

  const preventBreak = (text) => {
    if (!text) return '';
    return text.replace(/-/g, '\u2011');
  };

  const titleHtmlNoBreak = preventBreak(t.titleHtml);

  return (
    <section 
      id="inicio"
      className="w-full flex items-center justify-center p-4 font-sans relative overflow-hidden"
      style={heroStyle}
    >
      {/* Referencia en el tope para ocultar flechas al bajar 1px */}
      <div ref={topRef} className="absolute top-0 left-0 w-full h-2 pointer-events-none"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
      
      {/* Contenedor: centrado natural en móvil, desplazamiento hacia arriba en desktop */}
      <div className="relative z-10 text-white text-center w-full max-w-[1400px] md:-translate-y-[90px] px-4 flex flex-col items-center">
        <img 
          src="https://archivolesbico.yanmaria.org/img/AHMLFM-YMY_morado.png" 
          alt="Logo AHMFLM-YMY" 
          className="w-[150px] md:w-[200px] h-auto mb-8 drop-shadow-lg"
        />

        <h1 
          className="text-lg md:text-2xl font-bold uppercase tracking-[0.15em] leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
          dangerouslySetInnerHTML={{ __html: titleHtmlNoBreak }}
        >
        </h1>
        
        <h2 className="text-xs md:text-base font-light tracking-[0.25em] uppercase opacity-70 mb-8">
          {t.subtitleHtml}
        </h2>

        {/* Imagen Pies Blancos: Oculta en móvil, visible en escritorio */}
        <img 
          src="https://archivolesbico.yanmaria.org/img/pies-blancos-baja.png" 
          alt="Icono Pies" 
          className="hidden md:block w-auto max-w-[800px] h-auto opacity-90 drop-shadow-md"
        />
      </div>

      {/* Flechas de Scroll: Blancas, centradas y sin saltos */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none z-20">
        <div 
          className={`flex flex-col items-center transition-all duration-500 ease-in-out
            ${showArrow ? 'opacity-80' : 'opacity-0 translate-y-10'}`}
        >
          <span 
            className="text-3xl md:text-4xl leading-none font-light animate-bounce"
            style={{ color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
          >
            ︾
          </span>
        </div>
      </div>
    </section>
  );
}