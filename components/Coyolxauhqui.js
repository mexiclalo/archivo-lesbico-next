'use client';

import React from 'react';

export default function Coyolxauhqui({ t }) {
  if (!t) return null;

  return (
    <section 
      id="coyolxauhqui"
      className="min-h-screen w-full flex items-center justify-center p-8 bg-black text-white font-sans border-t border-white/20"
    >
      <div className="max-w-7xl w-full text-center">
        <h2 className="text-3xl md:text-6xl font-bold tracking-widest uppercase mb-12">
          {t.title}
        </h2>
        <div className="aspect-video bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 rounded-lg">
          [ Espacio para Contenido Coyolxauhqui ]
        </div>
      </div>
    </section>
  );
}
