import Link from 'next/link';
import { getDictionary } from '../../../../lib/get-dictionary';
import YearPortada from '../../../../components/YearPortada';
import Breadcrumbs from '../../../../components/Breadcrumbs';

export async function generateStaticParams() {
  const decades = ["1970"];
  const langs = ["es", "en"];
  
  const params = [];
  langs.forEach(lang => {
    decades.forEach(decade => {
      params.push({ lang, decade });
    });
  });
  
  return params;
}

export default async function DecadePage({ params }) {
  const { lang, decade } = await params;
  const dict = await getDictionary(lang);
  
  const decadeData = dict.decadasData?.[decade];
  const subtitleLabel = lang === 'es' ? 'DÉCADA' : 'DECADE';

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: lang === 'es' ? 'Décadas' : 'Decades', href: null },
    { label: decade, href: null }
  ];

  const HistoryBlock = ({ block }) => (
    <div className={`w-full ${block.title ? 'space-y-12 pt-16' : 'space-y-8 mt-12'}`}>
      {block.title && (
        <div className="text-center space-y-4 mb-8">
          <h2 
            className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-[#791E8F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {block.title}
          </h2>
          <div className="w-24 h-1 bg-[#8C0DC2] mx-auto opacity-30"></div>
        </div>
      )}
      {block.subtitle && (
        <div className="text-left space-y-2 max-w-5xl mx-auto group">
          {block.href ? (
            <Link 
              href={`/${lang}${block.href}`}
              className="inline-flex items-center gap-2 text-base md:text-lg font-bold text-[#8C0DC2] uppercase tracking-widest leading-relaxed hover:text-[#791E8F] transition-all"
            >
              <span className="text-[#8C0DC2] group-hover:translate-x-1 transition-transform not-italic">➤</span>
              <span className="italic">{block.subtitle}</span>
            </Link>
          ) : (
            <h3 className="text-base md:text-lg font-bold italic text-zinc-500 uppercase tracking-widest leading-relaxed">
              {block.subtitle}
            </h3>
          )}
          <div className="w-12 h-[1px] bg-[#8C0DC2] opacity-30 transition-all group-hover:w-24 group-hover:opacity-100"></div>
        </div>
      )}
      <div className="text-base md:text-xl leading-relaxed text-justify text-zinc-800 space-y-8 max-w-5xl mx-auto">
        {block.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />

      <YearPortada year={decade} subtitle={subtitleLabel} />
      
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        {decadeData ? (
          <div className="w-full space-y-32">
            
            <div className="space-y-24 w-full">
              {decadeData.history && decadeData.history.map((block, bIdx) => (
                <HistoryBlock key={`hist-${bIdx}`} block={block} />
              ))}
            </div>

            {decadeData.orgTable && (
              <div className="pt-12 space-y-16 w-full flex flex-col items-center">
                <div className="text-center space-y-4">
                  <h2 
                    className="text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase text-[#791E8F]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {decadeData.orgTable.title}
                  </h2>
                  <p className="text-sm md:text-base italic text-zinc-500">
                    {decadeData.orgTable.guide}
                  </p>
                </div>

                <div className="w-full max-w-5xl overflow-hidden border border-zinc-200 rounded-sm shadow-md bg-zinc-50/30">
                  <div className="hidden md:flex bg-[#291147] font-bold text-[10px] tracking-[0.3em] text-white/80">
                    <div className="w-24 p-5 border-r border-white/10 text-center">{decadeData.orgTable.headers.year}</div>
                    <div className="flex-grow p-5 px-8">{decadeData.orgTable.headers.org}</div>
                  </div>

                  <div className="divide-y divide-zinc-100">
                    {decadeData.orgTable.rows.map((row, rIdx) => (
                      <div 
                        key={rIdx} 
                        className={`flex flex-col md:flex-row transition-all ${row.highlight ? 'border-[3px] border-[#8C0DC2] m-1 bg-[#8C0DC2]/10 z-10 relative' : 'bg-white'}`}
                      >
                        <div className={`w-full md:w-24 p-4 flex items-center justify-center font-black text-zinc-500 md:border-r md:border-zinc-100 ${row.highlight ? 'text-[#62009A]' : ''}`}>
                          {row.year}
                        </div>
                        <div className={`flex-grow p-4 md:px-8 text-xs md:text-sm font-bold tracking-wide ${row.highlight ? 'text-[#291147]' : 'text-zinc-700'}`}>
                          {row.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-zinc-400 italic text-center">{decadeData.orgTable.footerNote}</p>
              </div>
            )}

            <div className="space-y-24 w-full">
              {decadeData.groupIntro && decadeData.groupIntro.map((block, bIdx) => (
                <HistoryBlock key={`group-${bIdx}`} block={block} />
              ))}
            </div>

            {decadeData.footerNote && (
              <p className="text-center pt-16 text-zinc-400 italic text-sm tracking-widest uppercase">{decadeData.footerNote}</p>
            )}

          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-400 italic">{lang === 'es' ? '[ Sección en construcción ]' : '[ Section under construction ]'}</p>
          </div>
        )}
      </div>
    </main>
  );
}