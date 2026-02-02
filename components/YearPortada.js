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

  const isLongTitle = title && title.length > 4;
  const titleClasses = isLongTitle 
    ? "text-4xl md:text-6xl lg:text-7xl" 
    : "text-7xl md:text-[10rem]";

  // Protegemos el acrónimo en el título si existe
  const formattedTitle = typeof title === 'string' 
    ? title.replace("AHMFLM-YMY", '<span class="whitespace-nowrap">AHMFLM-YMY</span>')
    : title;

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #D1D5DB, #63009B)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center w-full h-full p-8 md:p-16 translate-y-[15px]">
        <img 
          src={finalBg} 
          alt="Fondo Portada" 
          className="w-full h-full object-contain"
        />
      </div>

      <div ref={topRef} className="absolute top-0 left-0 w-full h-4 pointer-events-none"></div>
      
      <div className="relative z-10 text-white text-center px-4 flex flex-col items-center justify-center">
        <hgroup className="flex flex-col items-center">
          {subtitle && (
            <h2 
              className="text-sm md:text-2xl font-bold uppercase tracking-[0.5em] opacity-80 -mb-2 md:-mb-6 mr-[-0.5em]"
              style={{ 
                fontFamily: "var(--font-roboto), sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {subtitle}
            </h2>
          )}
          
          <h1 
            className={`${titleClasses} font-bold tracking-tight drop-shadow-2xl leading-tight md:leading-[0.8]`}
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          >
          </h1>
        </hgroup>
      </div>

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