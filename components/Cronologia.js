'use client';

import React from 'react';

export default function Cronologia({ t }) {
  if (!t) return null;

  return (
    <section 
      id="cronologia"
      className="min-h-screen w-full py-20 px-8 bg-zinc-100 text-black font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-16 text-center border-b-4 border-black pb-4 inline-block mx-auto w-full">
          {t.title}
        </h2>
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 before:to-transparent">
          {/* Item de cronología placeholder */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-zinc-300 group-[.is-active]:bg-black text-zinc-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[45%] bg-white p-4 rounded border border-zinc-200 shadow">
              <time className="font-bold text-zinc-500">AÑO</time>
              <div className="text-zinc-800">[ Hito histórico ]</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
