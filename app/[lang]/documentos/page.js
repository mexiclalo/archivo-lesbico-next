import { getDictionary } from '../../../lib/get-dictionary';
import YearPortada from '../../../components/YearPortada';
import Breadcrumbs from '../../../components/Breadcrumbs';
import fs from 'fs';
import path from 'path';

export default async function DocumentosPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const labels = dict.documentos;

  const fileName = lang === 'en' ? 'documentos_relevantes_en.json' : 'documentos_relevantes.json';
  const jsonPath = path.join(process.cwd(), 'data', fileName);
  const fileContent = fs.readFileSync(jsonPath, 'utf8');
  const { documentos: items } = JSON.parse(fileContent);

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: dict.navigation.documents, href: null }
  ];

  const docBg = "https://archivolesbico.yanmaria.org/img/pantallaGrande/portada/Archivo-lesbianas-feministas-documentos-relevantes.png";

  const formattedTitle = labels.title.replace("AHMFLM-YMY", '<span class="whitespace-nowrap">AHMFLM-YMY</span>');

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />
      
      <YearPortada 
        title={dict.navigation.documents} 
        bgImage={docBg}
      />

      <div className="w-full">
        
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center">
          <div className="w-full text-center space-y-2 mb-20 flex flex-col items-center">
            <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800 opacity-90">
              {labels.archiveName}
            </p>
            <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-600 opacity-80">
              Yan María Yaoyólotl <span className="whitespace-nowrap">(AHMFLM-YMY)</span>
            </p>
            <div className="w-16 h-[1px] bg-zinc-200 mt-8"></div>
          </div>

          <div className="flex flex-col items-center space-y-16 mb-12">
            <div className="text-center space-y-4">
              <h2 
                className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-[#791E8F] max-w-4xl mx-auto leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
                dangerouslySetInnerHTML={{ __html: formattedTitle }}
              >
              </h2>
              <div className="w-24 h-1 bg-[#8C0DC2] mx-auto opacity-30"></div>
            </div>

            <div className="text-base md:text-xl leading-relaxed text-justify text-zinc-800 max-w-5xl">
              <p>{labels.description}</p>
            </div>
          </div>
        </div>

        {/* ÍNDICE DE DOCUMENTOS TOTALMENTE CENTRADO */}
        {items && items.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 mb-32 flex justify-center">
            <div className="bg-zinc-100 border border-zinc-200 p-8 md:p-16 rounded-sm w-full max-w-5xl shadow-sm text-center">
              <h3 className="text-sm font-black tracking-[0.4em] uppercase text-zinc-400 mb-12 border-b border-zinc-200 pb-6 text-center">
                {labels.indexTitle}
              </h3>
              <ul className="space-y-10">
                {items.map((item) => (
                  <li key={item.id} className="flex flex-col items-center">
                    <a 
                      href={`#doc-${item.id}`}
                      className="group flex flex-col items-center gap-1 text-[#8C0DC2] hover:text-[#791E8F] transition-all"
                    >
                      <span className="text-sm md:text-base font-bold uppercase tracking-widest border-b border-transparent group-hover:border-[#791E8F]">
                        {item.index_title}
                      </span>
                      <span className="text-[11px] md:text-xs normal-case font-medium text-zinc-500 leading-relaxed text-center max-w-2xl">
                        {item.index_subtitle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="w-full border-t border-zinc-200">
          {items && items.map((item, idx) => (
            <article 
              key={item.id} 
              id={`doc-${item.id}`}
              className={`w-full py-24 md:py-32 scroll-mt-20 border-b border-zinc-300/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-zinc-100'}`}
            >
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                
                <div className="w-full md:w-[30%] shrink-0">
                  {item.image && (
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto shadow-2xl rounded-sm border-2 border-[#291147]"
                    />
                  )}
                  {item.image_label && (
                    <p 
                      className="mt-4 text-[10px] text-center uppercase tracking-widest text-zinc-400 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.image_label }}
                    ></p>
                  )}
                </div>

                <div className="w-full md:w-[70%] space-y-8 flex flex-col items-center">
                  
                  <div className="space-y-4 w-full">
                    {/* TÍTULO REFINADO: Sans-serif (Roboto), más pequeño y compacto */}
                    <h2 
                      className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#791E8F] leading-tight text-center md:text-left"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    >
                    </h2>
                    
                    {item.subtitle && (
                      <h3 
                        className="text-base md:text-lg font-bold italic text-zinc-600 leading-relaxed border-l-4 border-[#8C0DC2]/20 pl-6 text-justify"
                        dangerouslySetInnerHTML={{ __html: item.subtitle }}
                      >
                      </h3>
                    )}
                  </div>

                  <div className="text-base md:text-lg leading-relaxed text-zinc-800 space-y-6 w-full">
                    {item.paragraphs.map((p, pIdx) => (
                      <div key={pIdx} className="text-justify" dangerouslySetInnerHTML={{ __html: p }}></div>
                    ))}
                  </div>

                  {item.video && (
                    <div className="pt-6 w-full flex justify-center">
                      <div className="w-full max-w-2xl">
                        <video 
                          controls 
                          className="w-full shadow-2xl rounded-sm border-2 border-[#291147]"
                          poster={item.video.poster}
                        >
                          <source src={item.video.url} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  )}

                  {item.contact && (
                    <div className="pt-6 w-full flex flex-wrap justify-center gap-8">
                      {item.contact.map((c, cIdx) => (
                        <a 
                          key={cIdx} 
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs md:text-sm font-bold text-[#8C0DC2] hover:text-[#791E8F] border-b border-[#8C0DC2]/20 pb-1 transition-colors"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {item.links && (
                    <div className="pt-10 w-full flex flex-wrap justify-center gap-8">
                      {item.links.map((link, lIdx) => (
                        <a 
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col w-full max-w-[280px] shadow-2xl hover:scale-105 transition-all active:scale-95 bg-[#8C0DC2] rounded-sm overflow-hidden border-2 border-[#291147]"
                        >
                          {link.img && (
                            <div className="w-full aspect-[3/4] overflow-hidden border-b-2 border-[#291147]">
                              <img src={link.img} className="w-full h-full object-cover" alt="" />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-center gap-3 px-6 py-5 text-white">
                            <span className="text-lg group-hover:translate-x-1 transition-transform">➤</span>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-center leading-tight" dangerouslySetInnerHTML={{ __html: link.label }}></span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* NOTA AL PIE CENTRADA */}
                  {item.footnote && (
                    <div className="pt-10 w-full text-center">
                      <p 
                        className="text-[10px] md:text-xs italic text-zinc-400 max-w-2xl mx-auto" 
                        dangerouslySetInnerHTML={{ __html: item.footnote }}
                      ></p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-zinc-400 italic text-sm uppercase tracking-widest">
            {lang === 'es' ? '[ Más documentos en proceso ]' : '[ More documents in process ]'}
          </p>
        </div>

      </div>
    </main>
  );
}