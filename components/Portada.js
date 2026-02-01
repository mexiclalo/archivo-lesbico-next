'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function Portada({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  const imageUrl = "https://res.cloudinary.com/ddwwd00qg/image/upload/f_auto,q_auto,e_blur:100,e_brightness:30,c_limit,w_2000/v1769143702/para_pagina_copia_on8c5e.jpg";

  // Estilos limpios
  const heroStyle = {
    backgroundColor: '#291147',
    textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
    minHeight: '100svh', // Altura estable que ignora la barra de direcciones
    height: '100svh',
  };

  if (!t) return <div className="min-h-[100svh] h-[100svh] bg-[#291147]"></div>;

  // Función para evitar que las palabras con guiones se rompan
  const preventBreak = (text) => {
    if (!text) return '';
    // Reemplaza guión normal por Non-breaking hyphen (U+2011)
    return text.replace(/-/g, '\u2011');
  };

  const titleNoBreak = preventBreak(t.title);
  const subtitleNoBreak = t.subtitleHtml ? t.subtitleHtml.replace(/-/g, '\u2011') : '';

  return (
    <section 
      id="inicio"
      className="w-full flex items-center justify-center p-4 font-sans relative overflow-hidden"
      style={heroStyle}
    >
      {/* Capas de degradado sutil para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
      
      <div className="relative text-white text-center max-w-7xl -translate-y-10 md:-translate-y-[90px]">
        <h1 className="text-xl md:text-4xl font-extrabold uppercase tracking-widest opacity-90 break-keep mb-8 md:mb-12">{titleNoBreak}</h1>
        <h2 className="text-3xl md:text-6xl italic leading-tight px-4 break-keep" dangerouslySetInnerHTML={{ __html: subtitleNoBreak }}></h2>
      </div>
    </section>
  );
}