'use client';

import React from 'react';

export default function InMemoriam({ t }) {
  if (!t) return null;

  return (
    <section 
      id="memoriam"
      className="min-h-screen w-full flex items-center justify-center p-8 font-sans"
      style={{ background: 'linear-gradient(to right, #6E542A, #CCC6BF)' }}
    >
      <div className="max-w-7xl w-full text-center">
        <h2 className="text-3xl md:text-6xl font-bold tracking-widest uppercase mb-12" style={{ color: '#36270A' }}>
          {t.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="aspect-[3/4] bg-black/20 border border-black/10 rounded-lg flex items-center justify-center text-zinc-800">
            [ Foto Alaíde Foppa ]
          </div>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ color: '#36270A' }}>
            <p>[ Semblanza o texto conmemorativo ]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
