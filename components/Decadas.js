'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Decadas({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  if (!t) return null;

  return (
    <section 
      id="decadas"
      className="w-full py-20 px-6 bg-white flex flex-col items-center border-t border-zinc-100"
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Encabezado del Archivo */}
        <div className="text-center mb-16 space-y-2">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800 opacity-90">
            {t.archiveName}
          </p>
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-600 opacity-80">
            {t.archiveSubtitle}
          </p>
        </div>

        {/* Título de Sección Largo con Serifa */}
        <h2 
          className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase mb-16 text-center text-[#791E8F] leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
          dangerouslySetInnerHTML={{ __html: t.title }}
        >
        </h2>

        {/* Cuerpo de Texto Histórico */}
        <div className="space-y-8 text-base leading-relaxed text-justify text-zinc-800 mb-20">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <p>{t.p4}</p>
          <p>{t.p5}</p>
          <p>{t.p6}</p>
          <p>{t.p7}</p>
        </div>

        {/* ENTRADA DÉCADA 1970 */}
        <div className="w-full max-w-2xl bg-zinc-50 border border-zinc-100 p-10 md:p-16 rounded-sm shadow-sm flex flex-col items-center text-center space-y-10">
          <div className="space-y-4">
            <h3 
              className="text-2xl md:text-4xl font-bold tracking-widest text-[#791E8F]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.decade1970.title}
            </h3>
            <p className="text-lg md:text-xl font-medium text-zinc-700 italic max-w-lg mx-auto leading-relaxed">
              {t.decade1970.subtitle}
            </p>
          </div>

          {/* Nuevo párrafo de contexto */}
          <p className="text-base leading-relaxed text-justify text-zinc-800 italic opacity-90 border-l-2 border-[#791E8F]/20 pl-6">
            {t.decade1970.description}
          </p>

          <Link 
            href={`/${lang}/decadas/1970`}
            className="px-12 py-3 bg-[#8C0DC2] text-white text-sm font-bold uppercase tracking-[0.3em] rounded-sm shadow-md hover:bg-[#791E8F] hover:scale-105 active:scale-95 transition-all"
          >
            {t.decade1970.button}
          </Link>
        </div>

      </div>
    </section>
  );
}