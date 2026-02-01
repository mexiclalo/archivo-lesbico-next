'use client';

import React from 'react';

export default function PageHeader({ title }) {
  return (
    <div 
      className="w-full pt-32 pb-16 px-6 text-center shadow-lg"
      style={{ 
        background: 'linear-gradient(to bottom, #A165C8, #63009B)'
      }}
    >
      <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-md">
        {title}
      </h1>
    </div>
  );
}
