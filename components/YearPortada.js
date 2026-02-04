'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function YearPortada({ title, subtitle, bgImage, isCover = false, attribution }) {
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

  const sectionStyle = isCover 
    ? {} 
    : { background: 'linear-gradient(to bottom, #D1D5DB, #63009B)' };

  const imgClasses = isCover
    ? "w-full h-full object-cover object-left"
    : "w-full h-full object-contain translate-y-[15px]";

  const isLongTitle = title && title.length > 8;
  const h1Classes = isCover
    ? "text-4xl md:text-7xl lg:text-8xl" 
    : (isLongTitle ? "text-4xl md:text-6xl lg:text-7xl" : "text-6xl md:text-[8rem]");

  const h2Classes = isCover
    ? "text-xs md:text-lg mb-6" 
    : "text-lg md:text-2xl -mb-3";

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={sectionStyle}
    >
      <div className={`absolute inset-0 w-full h-full ${!isCover ? 'p-8 md:p-16' : ''}`}>
        <img 
          src={finalBg} 
          alt="Fondo Portada" 
          className={imgClasses}
        />
        {isCover && <div className="absolute inset-0 bg-black/30"></div>}
      </div>

      <div ref={topRef} className="absolute top-0 left-0 w-full h-4 pointer-events-none"></div>
      
      <div className="relative z-10 text-white text-center px-4 flex flex-col items-center justify-center">
        <hgroup className="flex flex-col items-center">
          {subtitle && (
            <h2 
              className={`${h2Classes} font-bold uppercase tracking-[0.4em] opacity-80 mr-[-0.4em] leading-none`}
              style={{ 
                fontFamily: "var(--font-roboto), sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            >
            </h2>
          )}
          
          <h1 
            className={`${h1Classes} font-bold tracking-tight drop-shadow-2xl leading-none`}
            style={{ 
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          >
          </h1>
        </hgroup>
      </div>

      {/* ATRIBUCIÓN DISCRETA (Abajo a la derecha) */}
      {attribution && (
        <div className="absolute bottom-6 right-6 z-30 text-[8px] md:text-[10px] text-white/40 hover:text-white transition-colors text-right leading-tight">
          <div dangerouslySetInnerHTML={{ __html: attribution }}></div>
        </div>
      )}

      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none z-20">
        <div className={`transition-all duration-700 ease-in-out ${showArrow ? 'opacity-90' : 'opacity-0 translate-y-10'}`}>
          <span className="text-3xl md:text-4xl leading-none font-light animate-bounce text-white">︾</span>
        </div>
      </div>
    </section>
  );
}