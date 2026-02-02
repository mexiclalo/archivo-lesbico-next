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

export default async function Decade1970Page({ params }) {
  const { lang, decade } = await params;
  const dict = await getDictionary(lang);
  
  const decadeData = dict.decadasData?.["1970"];

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: lang === 'es' ? 'Décadas' : 'Decades', href: null },
    { label: "1970", href: null }
  ];

  const HistoryBlock = ({ block }) => (
    <div className={`w-full ${block.title ? 'space-y-12 pt-16' : 'space-y-8 mt-12'}`}>
      {block.title && (
        <h2 
          className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-[#791E8F] text-center mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {block.title}
        </h2>
      )}
      {block.subtitle && (
        <div className="text-left space-y-2 max-w-5xl mx-auto">
          <h3 className="text-base md:text-lg font-bold italic text-zinc-500 uppercase tracking-widest leading-relaxed">
            {block.subtitle}
          </h3>
          <div className="w-12 h-[1px] bg-[#8C0DC2] opacity-30"></div>
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

      <YearPortada year="1970" />
      
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        {decadeData ? (
          <div className="w-full space-y-32">
            
            {/* 1. Narrativa Histórica Inicial */}
            <div className="w-full space-y-12">
              {decadeData.history && decadeData.history.map((block, bIdx) => (
                <HistoryBlock key={`hist-${bIdx}`} block={block} />
              ))}
            </div>

            {/* 2. TABLA DE ORGANIZACIONES */}
            {decadeData.orgTable && (
              <div className="pt-12 space-y-12 w-full">
                <div className="text-center space-y-4">
                  <h2 
                    className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-[#791E8F]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {decadeData.orgTable.title}
                  </h2>
                  <p className="text-sm md:text-base italic text-zinc-500">
                    {decadeData.orgTable.guide}
                  </p>
                </div>

                <div className="w-full overflow-hidden border border-zinc-100 rounded-sm shadow-sm">
                  <div className="hidden md:flex bg-zinc-50 border-b border-zinc-200 font-bold text-[10px] tracking-widest text-zinc-400">
                    <div className="w-24 p-4 border-r border-zinc-200 text-center">{decadeData.orgTable.headers.year}</div>
                    <div className="flex-grow p-4">{decadeData.orgTable.headers.org}</div>
                  </div>
                  <div className="divide-y divide-zinc-100">
                    {decadeData.orgTable.rows.map((row, rIdx) => (
                      <div key={rIdx} className={`flex flex-col md:flex-row transition-all ${row.highlight ? 'border-2 border-[#8C0DC2] m-1 bg-[#8C0DC2]/5' : 'bg-white'}`}>
                        <div className={`w-full md:w-24 p-4 flex items-center justify-center font-bold text-zinc-500 md:border-r md:border-zinc-100 ${row.highlight ? 'text-[#8C0DC2]' : ''}`}>
                          {row.year}
                        </div>
                        <div className={`flex-grow p-4 md:px-8 text-xs md:text-sm font-medium tracking-wide ${row.highlight ? 'text-[#63009B]' : 'text-zinc-700'}`}>
                          {row.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-zinc-400 italic">{decadeData.orgTable.footerNote}</p>
              </div>
            )}

            {/* 3. Introducción a los cuatro grupos */}
            <div className="w-full space-y-12">
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