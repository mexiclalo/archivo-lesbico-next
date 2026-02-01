'use client';

import React from 'react';

export default function InMemoriam({ t }) {
  if (!t) return null;

  return (
    <section 
      id="memoriam"
      className="w-full py-20 px-6 flex flex-col items-center"
      style={{ 
        background: 'linear-gradient(to right, #6E542A, #CCC6BF)',
        color: '#36270A'
      }}
    >
      <div className="max-w-6xl w-full">
        
        {/* Encabezado del Archivo (Centrado arriba) */}
        <div className="text-center mb-20 space-y-2">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest opacity-90">
            {t.archiveName}
          </p>
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase opacity-80">
            {t.archiveSubtitle}
          </p>
        </div>

        {/* Composición Foto e IN MEMORIAM */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-20">
          
          {/* Foto de Alaíde Foppa (Chica: 200px) */}
          <div className="shrink-0">
            <img 
              src="https://archivolesbico.yanmaria.org/img/pantallaGrande/Alaide_Foppa.jpg" 
              alt={t.altPhoto} 
              className="w-[150px] md:w-[200px] h-auto rounded-sm shadow-xl border-4 border-[#36270A]/10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Título IN MEMORIAM ALAÍDE FOPPA */}
          <div className="text-center md:text-left">
            <h2 
              className="text-3xl md:text-6xl font-bold tracking-[0.1em] leading-none mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.title}
            </h2>
            <h3 
              className="text-2xl md:text-5xl font-light tracking-[0.2em] uppercase opacity-90"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.subtitle}
            </h3>
          </div>
        </div>

        {/* Contenido Biográfico y Semblanza */}
        <div className="space-y-8 text-base leading-relaxed text-justify">
          
          <p className="italic font-medium" dangerouslySetInnerHTML={{ __html: t.intro }} />

          <p className="text-sm font-bold uppercase tracking-wider border-b border-[#36270A]/20 pb-4" dangerouslySetInnerHTML={{ __html: t.date }} />

          <div className="pt-8">
            <h4 
              className="text-lg md:text-2xl font-bold uppercase tracking-widest mb-8 text-center md:text-left"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.question}
            </h4>
            
            <div className="space-y-6">
              <p dangerouslySetInnerHTML={{ __html: t.bio1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.bio2 }} />
              <p dangerouslySetInnerHTML={{ __html: t.bio3 }} />
              <p dangerouslySetInnerHTML={{ __html: t.bio4 }} />
              <p dangerouslySetInnerHTML={{ __html: t.bio5 }} />
              <p className="pb-12" dangerouslySetInnerHTML={{ __html: t.bio6 }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
