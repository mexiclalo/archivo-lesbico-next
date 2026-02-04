'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function YearPortada({ title, subtitle, bgImage }) {
  const [showArrow, setShowArrow] = useState(true);
  const topRef = useRef(null);

  const defaultBg = "https://archivolesbico.yanmaria.org/img/pantallaGrande/portada/fondo.png";
  const finalBg = bgImage || defaultBg;

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

  const formattedTitle = typeof title === 'string' 
    ? title.replace("AHMFLM-YMY", '<span class="whitespace-nowrap">AHMFLM-YMY</span>')
    : title;

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Contenedor de Imagen: 100vh, object-cover y alineación a la izquierda */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={finalBg} 
          alt="Fondo Portada" 
          className="w-full h-full object-cover object-left"
        />
        {/* Velo oscuro para legibilidad de los textos */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div ref={topRef} className="absolute top-0 left-0 w-full h-4 pointer-events-none"></div>
      
      <div className="relative z-10 text-white text-center px-4 flex flex-col items-center justify-center">
        <hgroup className="flex flex-col items-center">
          {subtitle && (
            <h2 
              className="text-xs md:text-lg font-bold uppercase tracking-[0.4em] opacity-80 mb-6 mr-[-0.4em] leading-relaxed"
              style={{ 
                fontFamily: "var(--font-roboto), sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            >
            </h2>
          )}
          
          {/* TAMAÑO FIJO: Sin lógica de escalado por longitud */}
          <h1 
            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-2xl leading-none"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          >
          </h1>
        </hgroup>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none z-20">
        <div className={`transition-all duration-700 ease-in-out ${showArrow ? 'opacity-90' : 'opacity-0 translate-y-10'}`}>
          <span className="text-3xl md:text-4xl leading-none font-light animate-bounce text-white">︾</span>
        </div>
      </div>
    </section>
  );
}