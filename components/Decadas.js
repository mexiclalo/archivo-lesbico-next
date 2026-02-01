'use client';

import React from 'react';

export default function Decadas({ t }) {
  if (!t) return null;

  const decadas = ["1970", "1980", "1990", "2000", "2010", "2020"];

  return (
    <section 
      id="decadas"
      className="min-h-screen w-full flex items-center justify-center p-8 bg-white font-sans"
    >
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl md:text-6xl font-black tracking-widest uppercase mb-16 text-center">
          {t.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {decadas.map(decada => (
            <div key={decada} className="aspect-square bg-zinc-900 text-white flex items-center justify-center text-4xl font-bold hover:bg-red-600 transition-colors cursor-pointer group rounded-xl shadow-xl">
              <span className="group-hover:scale-125 transition-transform">{decada}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
