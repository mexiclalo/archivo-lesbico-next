'use client';

import React, { useState } from 'react';

export default function Presentacion({ t }) {
  const [activeSection, setActiveSection] = useState(null);

  if (!t) return null;

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <section 
      id="presentacion"
      className="w-full py-20 px-6 bg-white flex flex-col items-center border-t border-zinc-100"
    >
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        {/* Encabezado del Archivo */}
        <div className="text-center mb-16 space-y-2">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800 opacity-90">
            {t.archiveName}
          </p>
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-600 opacity-80">
            {t.archiveSubtitle}
          </p>
        </div>

        {/* Título de Sección */}
        <h2 
          className="text-lg md:text-2xl font-bold tracking-[0.3em] uppercase mb-16 text-center text-[#791E8F]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.title}
        </h2>

        {/* Acordeón de Presentación */}
        <div className="w-full max-w-4xl space-y-4">
          {t.sections && t.sections.map((section) => (
            <div key={section.id} className="border-b border-zinc-100">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full py-6 flex items-center gap-4 group transition-colors"
              >
                <span className={`text-xl md:text-2xl transition-transform duration-300 ${activeSection === section.id ? 'rotate-90 text-[#791E8F]' : 'text-zinc-400 group-hover:text-[#791E8F]'}`}>
                  ➤
                </span>
                <span className={`text-base md:text-lg font-medium tracking-widest uppercase text-left transition-colors ${activeSection === section.id ? 'text-[#791E8F]' : 'text-zinc-800 group-hover:text-[#791E8F]'}`}>
                  {section.title}
                </span>
              </button>

              {/* Contenido Expandible */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeSection === section.id ? 'max-h-[2000px] opacity-100 pb-12' : 'max-h-0 opacity-0'}`}
              >
                <div 
                  className="text-base leading-relaxed text-justify space-y-6 text-zinc-700 px-4 md:pl-12"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}