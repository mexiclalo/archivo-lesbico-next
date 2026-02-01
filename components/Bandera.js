'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function Bandera({ t }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [showFullPoem, setShowFullPoem] = useState(false);

  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0 }
    );

    if (sectionRef.current) videoObserver.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) videoObserver.unobserve(sectionRef.current);
    };
  }, []);

  if (!t) return null;

  return (
    <section 
      ref={sectionRef}
      id="bandera"
      className="relative w-full min-h-[100svh] flex flex-col items-center py-24 gap-16 overflow-visible"
      style={{ clipPath: 'inset(0 0 0 0)' }} // Contenedor del efecto parallax
    >
      {/* CAPAS DE FONDO FIJAS (Sin interceptar eventos de mouse) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://archivolesbico.yanmaria.org/Bandera/Video/BANDERA2-2.mp4" type="video/mp4" />
        </video>
      </div>

      <div 
        className="fixed top-0 left-0 w-full h-full bg-[#291147]/80 pointer-events-none -z-10"
      ></div>

      {/* CONTENIDO (Z-10 para estar por encima) */}
      
      {/* Recuadro 1: Sujetos Históricos */}
      <div className="relative z-10 max-w-5xl px-6 w-full">
        <div className="bg-[#291147]/80 backdrop-blur-md border border-white p-8 md:p-16 shadow-2xl rounded-sm text-white text-center">
          <p className="text-sm md:text-base uppercase tracking-widest font-bold mb-8 border-b border-white/20 pb-4 mx-auto max-w-2xl">{t.intro}</p>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-wide">{t.subject1.title}</h3>
              <p className="text-sm md:text-base opacity-80 font-light italic">{t.subject1.desc}</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-wide">{t.subject2.title}</h3>
              <p className="text-sm md:text-base opacity-80 font-light italic">{t.subject2.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recuadro 2: Línea Política */}
      <div className="relative z-10 max-w-5xl px-6 w-full">
        <div className="bg-[#291147]/80 backdrop-blur-md border border-white p-8 md:p-16 shadow-2xl rounded-sm text-white text-center">
          <h3 className="text-lg md:text-xl font-bold mb-10 uppercase tracking-[0.2em] border-b border-white/20 pb-4">{t.lineaPolitica.title}</h3>
          <div className="space-y-8 text-base md:text-xl leading-relaxed">
            {t.lineaPolitica.points.map((point, idx) => (
              <p key={idx} className="font-medium italic">• {point}</p>
            ))}
          </div>
          <p className="mt-12 text-xs md:text-sm opacity-70 font-light leading-relaxed border-t border-white/10 pt-6 max-w-3xl mx-auto">{t.lineaPolitica.note}</p>
        </div>
      </div>

      {/* Recuadro 3: Feminismo Antisistémico */}
      <div className="relative z-10 max-w-5xl px-6 w-full">
        <div className="bg-[#291147]/80 backdrop-blur-md border border-white p-8 md:p-16 shadow-2xl rounded-sm text-white text-center">
          <h3 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wider">{t.antisistemico.title}</h3>
          <p className="text-sm md:text-base opacity-80 italic mb-10 border-b border-white/20 pb-6 max-w-3xl mx-auto leading-relaxed">{t.antisistemico.synthesis}</p>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mb-12 opacity-90">{t.antisistemico.subtitle}</p>
          <div className="space-y-12">
            <div className="space-y-4">
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-wide">{t.antisistemico.radical.title}</h4>
              <p className="text-sm md:text-lg opacity-80 leading-relaxed font-light italic max-w-4xl mx-auto">{t.antisistemico.radical.list}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-wide">{t.antisistemico.socialista.title}</h4>
              <p className="text-sm md:text-lg opacity-80 leading-relaxed font-light italic max-w-4xl mx-auto">{t.antisistemico.socialista.list}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recuadro 4: Dedicatoria Final */}
      <div className="relative z-10 max-w-5xl px-6 w-full">
        <div className="bg-[#291147]/80 backdrop-blur-md border border-white p-8 md:p-16 shadow-2xl rounded-sm text-white flex flex-col">
          <div className="text-center flex-grow">
            <p className="text-lg md:text-2xl font-bold leading-tight mb-8">{t.dedicatoria.p1}</p>
            <p className="text-sm md:text-lg leading-relaxed opacity-90 font-light italic">{t.dedicatoria.list}</p>
            <p className="text-base md:text-xl font-medium py-10">{t.dedicatoria.p2}</p>
            <p className="text-sm md:text-lg leading-relaxed opacity-90 mb-8">{t.dedicatoria.p3}</p>
            <p className="text-base md:text-xl font-bold pb-12">{t.dedicatoria.p4}</p>
          </div>
          <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase opacity-60 text-left border-t border-white/10 pt-6">{t.dedicatoria.final}</p>
        </div>
      </div>

      {/* Poema */}
      <div className="relative z-10 max-w-4xl px-6 w-full text-white text-center">
        <div className="space-y-12 py-12">
          {[t.poema.p1, t.poema.p2, t.poema.p3, t.poema.p4, t.poema.p5].map((para, idx) => (
            <p key={`b1-${idx}`} className="text-lg md:text-xl leading-relaxed font-medium italic" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 1px #1a0a33' }} dangerouslySetInnerHTML={{ __html: para }} />
          ))}

          {!showFullPoem ? (
            <div className="py-12 flex flex-col items-center gap-6">
              <div className="opacity-40 text-xl tracking-[1em]">--- --- ---</div>
              <button 
                onClick={() => setShowFullPoem(true)}
                className="px-8 py-2 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all text-xs uppercase tracking-[0.3em] opacity-70 hover:opacity-100"
              >
                Ver más
              </button>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="py-6 opacity-40 text-xl tracking-[1em]">--- --- ---</div>
              {[t.poema.p6, t.poema.p7, t.poema.p8, t.poema.p9, t.poema.p10, t.poema.p11].map((para, idx) => (
                <p key={`b2-${idx}`} className="text-lg md:text-xl leading-relaxed font-medium italic" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 1px #1a0a33' }} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
              <div className="py-6 opacity-40 text-xl tracking-[1em]">--- --- ---</div>
              {[t.poema.p12, t.poema.p13, t.poema.p14, t.poema.p15, t.poema.p16, t.poema.p17, t.poema.p18, t.poema.p19, t.poema.p20, t.poema.p21].map((para, idx) => (
                <p key={`b3-${idx}`} className="text-lg md:text-xl leading-relaxed font-medium italic" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 1px #1a0a33' }} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
              <div className="py-6 opacity-40 text-xl tracking-[1em]">--- --- ---</div>
              <p className="text-xl md:text-2xl leading-relaxed font-bold tracking-[0.4em] uppercase text-[#A165C8]" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 1px #1a0a33' }} dangerouslySetInnerHTML={{ __html: t.poema.p22 }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
