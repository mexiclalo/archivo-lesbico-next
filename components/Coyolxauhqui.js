'use client';

import React from 'react';

export default function Coyolxauhqui({ t }) {
  if (!t) return null;

  return (
    <section 
      id="coyolxauhqui"
      className="w-full py-20 px-6 bg-white font-sans flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        
        {/* Encabezado centrado */}
        <div className="flex flex-col items-center mb-12">
          <img 
            src="https://archivolesbico.yanmaria.org/img/AHMLFM-YMY_morado.png" 
            alt="Logo AHMFLM-YMY" 
            className="w-[200px] md:w-[300px] h-auto mb-8"
          />

          <h2 
            className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-center"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: "#791E8F"
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* Contenido con texto que contornea la imagen */}
        <div className="text-base leading-relaxed text-justify space-y-6" style={{ color: "#791E8F" }}>
          
          {/* Imagen Monolito con flotado y forma circular para el contorneo */}
          <img 
            src="https://archivolesbico.yanmaria.org/img/Coyolxauhqui/monolitos-templo-mayor-coyolxauhqui-baja-morada.png" 
            alt={t.altMonolito} 
            className="float-left w-[150px] md:w-[200px] h-auto drop-shadow-md mr-6 mb-4 md:mr-10 md:mb-6"
            style={{ 
              shapeOutside: 'circle(50%)',
              clipPath: 'circle(50%)'
            }}
          />

          <p dangerouslySetInnerHTML={{ __html: t.p1 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p2 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p3 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p4 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p5 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p6 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p7 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p8 }} />
          <p dangerouslySetInnerHTML={{ __html: t.p9 }} />
          
          <p className="pt-4" dangerouslySetInnerHTML={{ __html: t.p10 }} />
          
          <p className="pl-6 italic border-l-4 border-[#791E8F]/30 py-2" dangerouslySetInnerHTML={{ __html: t.p11 }} />
          
          <p dangerouslySetInnerHTML={{ __html: t.p12 }} />
          
          <p className="pb-12" dangerouslySetInnerHTML={{ __html: t.p13 }} />

          {/* Nueva Sección de Interpretaciones */}
          <div className="pt-12 mt-12 border-t border-[#791E8F]/20 flex flex-col items-center">
            <h3 className="text-lg md:text-xl font-bold mb-8 tracking-wide text-center">
              {t.interpretationsTitle}
            </h3>
            {/* Lista: Columna centrada en móvil, Wrap en escritorio */}
            <div className="flex flex-col md:flex-row md:flex-wrap items-center md:justify-center gap-x-6 gap-y-4 text-center max-w-4xl">
              {t.perspectivas.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-lg">➤</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-16 text-center italic opacity-60 text-sm tracking-widest uppercase">
              {t.inConstruction}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}