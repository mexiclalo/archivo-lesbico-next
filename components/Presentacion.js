'use client';

import React from 'react';

export default function Presentacion({ t }) {
  if (!t) return null;

  return (
    <section 
      id="presentacion"
      className="min-h-screen w-full flex items-center justify-center p-8 bg-white text-black font-sans"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase mb-12 text-center">
          {t.title}
        </h2>
        <div className="prose lg:prose-xl mx-auto text-zinc-800 leading-relaxed text-justify">
          <p>[ Texto de presentación del Archivo Histórico ]</p>
        </div>
      </div>
    </section>
  );
}
