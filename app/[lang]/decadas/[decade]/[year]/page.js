import Link from 'next/link';
import { getDictionary } from '../../../../../lib/get-dictionary';
import YearPortada from '../../../../../components/YearPortada';
import Breadcrumbs from '../../../../../components/Breadcrumbs';

export async function generateStaticParams() {
  const yearsMapping = {
    "1970": ["1976", "1977"]
  };
  const langs = ["es", "en"];
  const params = [];
  
  langs.forEach(lang => {
    Object.keys(yearsMapping).forEach(decade => {
      yearsMapping[decade].forEach(year => {
        params.push({ lang, decade, year });
      });
    });
  });
  
  return params;
}

export default async function YearPage({ params }) {
  const { lang, decade, year } = await params;
  const dict = await getDictionary(lang);
  
  const yearData = dict.years?.[year];
  const yearSubtitle = lang === 'es' ? 'AÑO' : 'YEAR';

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: decade, href: `/decadas/${decade}` },
    { label: year, href: null }
  ];

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />

      <YearPortada year={year} subtitle={yearSubtitle} />
      
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        {yearData ? (
          <div className="w-full space-y-24">
            
            {yearData.sections && yearData.sections.map((section, sIdx) => (
              <div key={sIdx} className="flex flex-col items-center text-center space-y-12">
                
                <h2 
                  className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-[#791E8F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {section.title}
                </h2>

                <div className="flex flex-col items-center gap-4 w-full">
                  {section.links && section.links.map((link, lIdx) => (
                    link.active ? (
                      <Link 
                        key={lIdx}
                        // CONSTRUCCIÓN DE URL CORREGIDA:
                        href={link.external ? link.href : `/${lang}/decadas/${decade}/${year}${link.href}`}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : ""}
                        className="group relative grid grid-cols-[40px_1fr_40px] items-center px-6 py-5 bg-[#8C0DC2] text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-[#791E8F] hover:scale-[1.02] active:scale-95 transition-all border border-white/20 w-full md:w-[800px]"
                      >
                        <span className="text-xl group-hover:translate-x-1 transition-transform text-left">➤</span>
                        <span className="text-center leading-relaxed px-2">{link.text}</span>
                        <span></span>
                      </Link>
                    ) : (
                      <div 
                        key={lIdx}
                        className="px-8 py-5 bg-zinc-50 border border-zinc-100 text-zinc-400 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] rounded-sm text-center italic w-full md:w-[800px]"
                      >
                        {link.text}
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}

            {yearData.footerNote && (
              <p className="text-center pt-16 text-zinc-400 italic text-sm tracking-widest uppercase">
                {yearData.footerNote}
              </p>
            )}

          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-400 italic">
              {lang === 'es' ? '[ Sección en construcción ]' : '[ Section under construction ]'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}