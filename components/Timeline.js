'use client';

import React from 'react';

export default function Timeline({ data, year, ui }) {
  if (!data || !Array.isArray(data)) return null;

  const labels = ui || {
    authors: "Autoras",
    source: "Fuente",
    downloadPdf: "Descargar PDF",
    document: "Documento",
    video: "Video Documental",
    noImage: "Sin imagen"
  };

  const basePath = `/cronologia/${year}`;

  const item2 = data.find(item => item.ID === 2);
  const item3 = data.find(item => item.ID === 3);

  const title2 = item2?.PLECAS_TITULOS_2 || "";
  const title3 = item3?.PLECAS_TITULOS_3 || "";

  return (
    <div className="w-full space-y-0 bg-white">
      
      {/* --- ENCABEZADO UNIFICADO --- */}
      <div className="w-full pt-24 pb-24 flex flex-col items-center px-6">
        <div className="max-w-5xl w-full text-center">
          
          <div className="space-y-2 mb-16">
            <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800 opacity-90">
              ARCHIVO HISTÓRICO DEL MOVIMIENTO FEMINISTA DE LESBIANAS EN MÉXICO,
            </p>
            <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-600 opacity-80">
              Yan María Yaoyólotl (AHMFLM-YMY)
            </p>
            <div className="w-16 h-[1px] bg-zinc-200 mx-auto mt-8"></div>
          </div>

          {title2 && (
            <h2 
              className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#791E8F] mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title2}
            </h2>
          )}

          {title3 && (
            <h3 
              className="text-base md:text-lg font-bold uppercase tracking-[0.3em] text-zinc-500 max-w-4xl mx-auto leading-relaxed"
            >
              {title3}
            </h3>
          )}
        </div>
      </div>

      {data.map((item, index) => {
        if (item.ID === 1 || item.ID === 2 || item.ID === 3) return null;

        // 1. RENDERIZADO DE PLECAS RESTANTES (4 a 8)
        for (let i = 4; i <= 8; i++) {
          const plecaKey = `PLECAS_TITULOS_${i}`;
          if (item[plecaKey] && item[plecaKey].trim() !== "") {
            
            let plecaClasses = "w-full py-12 px-6 text-center tracking-[0.2em] uppercase ";
            let plecaStyle = { fontFamily: "'Playfair Display', serif" };

            if (i >= 4 && i <= 6) { 
              plecaClasses += "bg-[#62009b] text-white text-lg md:text-xl border-b-2 border-white/20 py-12"; 
            } else if (i === 7) { 
              plecaClasses += "bg-[#FFFAD3] text-[#391d5b] text-base md:text-lg font-normal italic lowercase first-letter:uppercase py-12"; 
            } else if (i === 8) { 
              plecaClasses += "bg-[#E00070] text-white text-base md:text-lg py-12"; 
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

        // 2. RENDERIZADO DE MESES (Fondo Color Catálogo #1a0a33)
        if (item.PLECA_MESES && item.PLECA_MESES.trim() !== "") {
          return (
            <div key={`mes-${index}`} className="w-full py-12 bg-[#1a0a33] text-center px-6">
              <span className="text-white text-xl md:text-3xl font-black tracking-[0.5em] uppercase">
                {item.PLECA_MESES}
              </span>
            </div>
          );
        }

        // 3. RENDERIZADO DE FICHA DE ARCHIVO
        const itemNumber = item.NUMERO || item.NUMERO_MES;
        
        if (itemNumber) {
          const TechnicalData = () => (
            <div className="space-y-6 text-center flex flex-col items-center">
              {item.FECHA && <p className="text-sm font-black text-[#740EBD] uppercase tracking-tighter">{item.FECHA}</p>}
              {item.AUTORAS && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-widest">{labels.authors}</span>
                  <p className="text-xs md:text-sm text-zinc-800 font-medium leading-tight">{item.AUTORAS}</p>
                </div>
              )}
              {item.FUENTE && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-widest">{labels.source}</span>
                  <div 
                    className="text-xs md:text-sm text-zinc-600 italic leading-snug break-words max-w-[200px]"
                    dangerouslySetInnerHTML={{ __html: item.FUENTE }}
                  />
                </div>
              )}
            </div>
          );

          return (
            <article key={`item-${index}`} className="w-full bg-white border-b border-[#740EBD]/10">
              
              <div className="md:hidden w-full bg-zinc-50 p-8 text-center space-y-6 border-b border-zinc-100">
                <h4 className="text-lg font-bold text-[#740EBD] uppercase tracking-wider leading-tight">
                  {item.TITULO_COMENTARIOS}
                </h4>
                <TechnicalData />
              </div>

              <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-[40%] p-6 md:p-12 flex flex-col items-center justify-center bg-white md:bg-zinc-50/20 space-y-6 order-2 md:order-1">
                  {item.NOMBRE_PARA_IMAGENES ? (
                    <div className="space-y-6 w-full flex flex-col items-center">
                      {[...Array(item.IMAGENES || 1)].map((_, imgIdx) => (
                        <img 
                          key={imgIdx}
                          src={`${basePath}/img/${item.NOMBRE_PARA_IMAGENES}${item.IMAGENES > 1 ? `-${imgIdx + 1}` : '-1'}.jpg`}
                          alt={item.TITULO_COMENTARIOS}
                          className="max-w-full h-auto shadow-sm border border-zinc-100 rounded-sm"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-zinc-200 italic text-xs">[ {labels.noImage} ]</div>
                  )}

                  {item.PDF === 1 && (
                    <a 
                      href={`${basePath}/pdf/${item.NOMBRE_PARA_IMAGENES}-1.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-red-800 transition-all shadow-md"
                    >
                      <i className="fas fa-file-pdf"></i> {labels.downloadPdf}
                    </a>
                  )}

                  {item.VIDEOS === 1 && (
                    <div className="w-full space-y-2">
                      <video controls className="w-full shadow-xl border border-zinc-100 rounded-sm">
                        <source src={`${basePath}/video/${item.NOMBRE_PARA_IMAGENES}-1.mp4`} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>

                <div className="hidden md:flex md:w-[20%] p-8 flex-col items-center justify-center text-center bg-[#740EBD]/5 border-x border-[#740EBD]/10 order-2">
                  <TechnicalData />
                </div>

                <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center bg-white order-3">
                  <h4 className="hidden md:block text-xl md:text-2xl font-bold text-[#740EBD] mb-10 leading-tight border-l-4 border-[#740EBD]/20 pl-6">
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