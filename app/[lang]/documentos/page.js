import { getDictionary } from '../../../lib/get-dictionary';
import YearPortada from '../../../components/YearPortada';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default async function DocumentosPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.documentos;

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: dict.navigation.documents, href: null }
  ];

  const docBg = "https://archivolesbico.yanmaria.org/img/pantallaGrande/portada/Archivo-lesbianas-feministas-documentos-relevantes.png";

  const formattedTitle = data.title.replace("AHMFLM-YMY", '<span class="whitespace-nowrap">AHMFLM-YMY</span>');

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />
      
      <YearPortada 
        title={dict.navigation.documents} 
        bgImage={docBg}
      />

      <div className="w-full">
        
        {/* ENCABEZADO INSTITUCIONAL */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center">
          <div className="w-full text-center space-y-2 mb-20 flex flex-col items-center">
            <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800 opacity-90">
              {data.archiveName}
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
              <p>{data.description}</p>
            </div>
          </div>
        </div>

        {/* ÍNDICE DE DOCUMENTOS */}
        {data.items && data.items.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 mb-32">
            <div className="bg-zinc-100 border border-zinc-200 p-8 md:p-12 rounded-sm max-w-5xl mx-auto shadow-sm">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase text-zinc-400 mb-8 border-b border-zinc-200 pb-4">
                {data.indexTitle}
              </h3>
              <ul className="space-y-4">
                {data.items.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      className="group flex items-start gap-3 text-xs md:text-sm font-bold uppercase tracking-wider text-[#8C0DC2] hover:text-[#791E8F] transition-colors"
                    >
                      <span>➤</span>
                      <span className="border-b border-transparent group-hover:border-[#791E8F]">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SECCIONES DE DOCUMENTOS */}
        <div className="w-full border-t border-zinc-200">
          {data.items && data.items.map((item, idx) => (
            <article 
              key={item.id} 
              id={item.id}
              className={`w-full py-24 md:py-32 scroll-mt-20 border-b border-zinc-300/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-zinc-100'}`}
            >
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                
                {/* Columna Izquierda (30%) - IMAGEN CON BORDE MORADO OSCURO */}
                <div className="w-full md:w-[30%] shrink-0">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto shadow-2xl rounded-sm border-2 border-[#291147]"
                  />
                </div>

                {/* Columna Derecha (70%) */}
                <div className="w-full md:w-[70%] space-y-8 flex flex-col items-center md:items-start">
                  
                  <div className="space-y-4 w-full">
                    <h2 
                      className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#791E8F] leading-tight text-center md:text-left"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h2>
                    
                    {item.subtitle && (
                      <h3 className="text-base md:text-lg font-bold italic text-zinc-600 leading-relaxed border-l-4 border-[#8C0DC2]/20 pl-6 text-justify">
                        {item.subtitle}
                      </h3>
                    )}
                  </div>

                  <div className="text-base md:text-lg leading-relaxed text-justify text-zinc-800 space-y-6 w-full">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} dangerouslySetInnerHTML={{ __html: p }}></p>
                    ))}
                  </div>

                  {/* VIDEO CENTRADO CON BORDE MORADO OSCURO */}
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

                  {item.links && (
                    <div className="pt-10 w-full flex flex-wrap justify-center gap-6">
                      {item.links.map((link, lIdx) => (
                        <a 
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 px-10 py-5 bg-[#8C0DC2] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-[#791E8F] transition-all active:scale-95"
                        >
                          <span className="text-lg group-hover:translate-x-1 transition-transform">➤</span>
                          <span className="text-center leading-none" dangerouslySetInnerHTML={{ __html: link.label }}></span>
                        </a>
                      ))}
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