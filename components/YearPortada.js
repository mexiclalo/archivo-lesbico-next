'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function YearPortada({ year, subtitle }) {
  const [showArrow, setShowArrow] = useState(true);
  const topRef = useRef(null);

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

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #D1D5DB, #63009B)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center w-full h-full p-8 md:p-16">
        <img 
          src="https://archivolesbico.yanmaria.org/img/pantallaGrande/portada/fondo.png" 
          alt="Fondo Año" 
          className="w-full h-full object-contain"
        />
      </div>

      <div ref={topRef} className="absolute top-0 left-0 w-full h-4 pointer-events-none"></div>
      
      {/* Contenido centrado con margen mínimo extremo entre h2 y h1 */}
      <div className="relative z-10 text-white text-center px-4 flex flex-col items-center justify-center">
        <hgroup className="flex flex-col items-center">
          {subtitle && (
            <h2 
              className="text-sm md:text-2xl font-bold uppercase tracking-[0.5em] opacity-80 -mb-4 md:-mb-10"
              style={{ 
                fontFamily: "var(--font-roboto), sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {subtitle}
            </h2>
          )}
          
          <h1 
            className="text-7xl md:text-[10rem] font-black tracking-tighter drop-shadow-2xl leading-none"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
          >
            {year}
          </h1>
        </hgroup>
      </div>

      {/* Flechas de Scroll Indicator */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none z-20">
        <div 
          className={`flex flex-col items-center transition-all duration-700 ease-in-out
            ${showArrow ? 'opacity-90' : 'opacity-0 translate-y-10'}`}
        >
          <span 
            className="text-3xl md:text-4xl leading-none font-light animate-bounce"
            style={{ color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
          >
            ︾
          </span>
        </div>
      </div>
    </section>
  );
}