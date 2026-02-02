'use client';

import React from 'react';

export default function Timeline({ data, year }) {
  if (!data || !Array.isArray(data)) return null;

  const basePath = `/cronologia/${year}`;

  return (
    <div className="w-full space-y-0">
      {data.map((item, index) => {
        // 1. RENDERIZADO DE PLECAS
        for (let i = 1; i <= 8; i++) {
          const plecaKey = `PLECAS_TITULOS_${i}`;
          if (item[plecaKey] && item[plecaKey].trim() !== "") {
            let plecaClasses = "w-full py-12 px-6 text-center font-bold tracking-[0.2em] uppercase ";
            let plecaStyle = { fontFamily: "'Playfair Display', serif" };

            if (i === 1 || i === 2) { 
              plecaStyle.backgroundColor = '#0d051a';
              plecaClasses += "text-white text-2xl md:text-4xl"; 
            } else if (i === 3) { 
              plecaClasses += "bg-[#FDFBD3] text-[#391d5b] text-xl md:text-2xl border-y border-zinc-200"; 
            } else if (i >= 4 && i <= 6) { 
              plecaClasses += "bg-[#62009b] text-white text-lg md:text-xl border-b-2 border-white/20"; 
            } else if (i === 7) { 
              plecaClasses += "bg-[#FFFAD3] text-[#391d5b] text-base md:text-lg font-normal italic lowercase first-letter:uppercase"; 
            } else if (i === 8) { 
              plecaClasses += "bg-[#E00070] text-white text-base md:text-lg"; 
            }

            return (
              <div key={`pleca-${index}`} className={plecaClasses} style={plecaStyle}>
                <div className="max-w-6xl mx-auto whitespace-pre-line">
                  {item[plecaKey]}
                </div>
              </div>
            );
          }
        }

        // 2. RENDERIZADO DE MESES
        if (item.PLECA_MESES && item.PLECA_MESES.trim() !== "") {
          return (
            <div key={`mes-${index}`} className="w-full py-10 bg-[#A165C8]/20 border-y border-[#A165C8]/30 text-center">
              <span className="text-[#63009B] text-xl md:text-3xl font-black tracking-[0.4em] uppercase">
                {item.PLECA_MESES}
              </span>
            </div>
          );
        }

        // 3. RENDERIZADO DE FICHA DE ARCHIVO
        // Modificado para detectar NUMERO o NUMERO_MES
        const itemNumber = item.NUMERO || item.NUMERO_MES;
        
        if (itemNumber) {
          const TechnicalData = () => (
            <div className="space-y-6">
              {item.FECHA && <p className="text-sm font-black text-[#740EBD] uppercase tracking-tighter">{item.FECHA}</p>}
              {item.AUTORAS && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-widest">Autoras</span>
                  <p className="text-xs md:text-sm text-zinc-800 font-medium leading-tight">{item.AUTORAS}</p>
                </div>
              )}
              {item.FUENTE && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-widest">Fuente</span>
                  <div 
                    className="text-xs md:text-sm text-zinc-600 italic leading-snug break-words"
                    dangerouslySetInnerHTML={{ __html: item.FUENTE }}
                  />
                </div>
              )}
            </div>
          );

          return (
            <article key={`item-${index}`} className="w-full bg-white border-b border-[#740EBD]/20">
              
              {/* VISTA MÓVIL */}
              <div className="md:hidden w-full bg-zinc-100 p-8 text-center space-y-6 border-b border-zinc-200">
                <h4 className="text-lg font-bold text-[#740EBD] uppercase tracking-wider leading-tight">
                  {item.TITULO_COMENTARIOS}
                </h4>
                <TechnicalData />
              </div>

              <div className="flex flex-col md:flex-row w-full">
                
                {/* COLUMNA 1: IMÁGENES Y MULTIMEDIA */}
                <div className="w-full md:w-[35%] p-6 flex flex-col items-center justify-center bg-white md:bg-zinc-50/30 space-y-6 order-2 md:order-1">
                  {item.NOMBRE_PARA_IMAGENES ? (
                    <div className="space-y-4 w-full flex flex-col items-center">
                      {[...Array(item.IMAGENES || 1)].map((_, imgIdx) => (
                        <img 
                          key={imgIdx}
                          src={`${basePath}/img/${item.NOMBRE_PARA_IMAGENES}${item.IMAGENES > 1 ? `-${imgIdx + 1}` : '-1'}.jpg`}
                          alt={item.TITULO_COMENTARIOS}
                          className="max-w-full h-auto shadow-md border border-zinc-200 rounded-sm"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-zinc-300 italic text-xs">[ Sin imagen ]</div>
                  )}

                  {item.PDF === 1 && (
                    <a 
                      href={`${basePath}/pdf/${item.NOMBRE_PARA_IMAGENES}-1.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-red-800 transition-colors shadow-sm"
                    >
                      <i className="fas fa-file-pdf"></i> Descargar PDF
                    </a>
                  )}

                  {item.VIDEOS === 1 && (
                    <div className="w-full space-y-2">
                      <p className="text-[10px] uppercase font-bold text-center text-zinc-400">Video Documental</p>
                      <video controls className="w-full shadow-lg border border-zinc-200">
                        <source src={`${basePath}/video/${item.NOMBRE_PARA_IMAGENES}-1.mp4`} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    </div>
                  )}
                </div>

                {/* COLUMNA 2 (SOLO ESCRITORIO): DATOS TÉCNICOS */}
                <div className="hidden md:flex md:w-[20%] p-8 flex-col items-center justify-center text-center bg-[#740EBD]/5 border-x border-[#740EBD]/10 order-2">
                  <TechnicalData />
                </div>

                {/* COLUMNA 3: RELATO */}
                <div className="w-full md:w-[45%] p-10 md:p-16 flex flex-col justify-center bg-white order-3">
                  <h4 className="hidden md:block text-xl md:text-2xl font-bold text-[#740EBD] mb-8 leading-snug">
                    {item.TITULO_COMENTARIOS}
                  </h4>
                  <div className="text-base md:text-lg text-zinc-700 leading-relaxed text-justify space-y-6">
                    {item.COMENTARIOS.split('\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

              </div>
            </article>
          );
        }
        return null;
      })}
    </div>
  );
}
