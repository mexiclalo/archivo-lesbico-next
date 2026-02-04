import { getDictionary } from '../../../../lib/get-dictionary';
import YearPortada from '../../../../components/YearPortada';
import Breadcrumbs from '../../../../components/Breadcrumbs';

export async function generateStaticParams() {
  const countries = ["argentina", "bolivia", "brasil", "chile", "costa-rica", "peru"];
  const langs = ["es", "en"];
  const params = [];
  
  langs.forEach(lang => {
    countries.forEach(country => {
      params.push({ lang, country });
    });
  });
  
  return params;
}

export default async function CountryPage({ params }) {
  const { lang, country } = await params;
  const dict = await getDictionary(lang);
  
  const countryKey = country.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const countryData = dict.indoafroasia?.[countryKey];

  if (!countryData) {
    return (
      <main className="min-h-screen bg-white pt-32 text-center">
        <p className="text-zinc-400 italic">[ Datos de {country} no encontrados ]</p>
      </main>
    );
  }

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: dict.navigation.indoafroasia, href: '/indoafroasia' },
    { label: countryData.title, href: null }
  ];

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />
      
      <YearPortada 
        title={countryData.title} 
        subtitle={countryData.subtitle}
        bgImage={countryData.bgImage}
        isCover={true}
        attribution={countryData.attribution}
      />

      <div className="w-full">
        
        {/* SECCIÓN INTRODUCTORIA */}
        {countryData.introduction && (
          <section className="w-full py-24 md:py-32 bg-white border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-16">
              
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                <div className="w-full md:w-[20%] shrink-0">
                  <img 
                    src={countryData.introduction.image}
                    alt={countryData.title}
                    className="w-full h-auto mix-blend-multiply opacity-90"
                  />
                </div>
                
                <div className="w-full md:w-[80%] space-y-8 flex flex-col items-start text-left">
                  <div className="space-y-4">
                    <h2 
                      className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#791E8F] leading-tight"
                      dangerouslySetInnerHTML={{ __html: countryData.introduction.title }}
                    >
                    </h2>
                    {countryData.introduction.subtitle && (
                      <h3 className="text-base md:text-lg font-bold text-zinc-500 tracking-wide uppercase italic">
                        {countryData.introduction.subtitle}
                      </h3>
                    )}
                  </div>
                  <div className="w-24 h-[1px] bg-[#8C0DC2] opacity-30"></div>
                  
                  {(countryData.introduction.impactText || countryData.introduction.text) && (
                    <div 
                      className="text-base md:text-xl font-bold leading-relaxed text-zinc-800 text-justify md:text-left w-full"
                      dangerouslySetInnerHTML={{ __html: countryData.introduction.impactText || countryData.introduction.text }}
                    ></div>
                  )}
                </div>
              </div>

              {countryData.introduction.fullText && (
                <div 
                  className="w-full text-base md:text-lg leading-relaxed text-zinc-700 text-justify"
                  dangerouslySetInnerHTML={{ __html: countryData.introduction.fullText }}
                ></div>
              )}

              {/* IMAGEN ADICIONAL AL FINAL DE LA INTRO (Solo si existe) */}
              {countryData.introduction.introImageBottom && (
                <div className="w-full pt-8 flex justify-center">
                  <img 
                    src={countryData.introduction.introImageBottom} 
                    className="w-full max-w-5xl h-auto shadow-2xl rounded-sm border border-zinc-100"
                    alt="Imagen complementaria"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* LISTADO DE ARTÍCULOS */}
        <div className="w-full border-t border-zinc-200">
          {countryData.items && countryData.items.map((item, idx) => (
            <article 
              key={item.id} 
              id={`doc-${item.id}`}
              className={`w-full py-24 md:py-32 scroll-mt-20 border-b border-zinc-300/50 ${idx % 2 !== 0 ? 'bg-white' : 'bg-zinc-100'}`}
            >
              <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                
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
                  <div className="space-y-4 w-full text-left">
                    <h2 
                      className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#791E8F] leading-tight"
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

                  <div className="text-base md:text-lg leading-relaxed text-zinc-800 space-y-6 w-full text-justify">
                    {item.paragraphs.map((p, pIdx) => (
                      <div key={pIdx} dangerouslySetInnerHTML={{ __html: p }}></div>
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