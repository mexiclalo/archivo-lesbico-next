import { getDictionary } from '../../../../../lib/get-dictionary';
import YearPortada from '../../../../../components/YearPortada';
import Breadcrumbs from '../../../../../components/Breadcrumbs';

export async function generateStaticParams() {
  const years = ["1976", "1977"];
  const langs = ["es", "en"];
  const params = [];
  langs.forEach(lang => {
    years.forEach(year => {
      params.push({ lang, year });
    });
  });
  return params;
}

export default async function EventosYearPage({ params }) {
  const { lang, year } = await params;
  const dict = await getDictionary(lang);
  
  const eventosData = dict.eventosIndex?.[year];

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: year, href: `/cronologia/${year}` },
    { label: lang === 'es' ? 'Eventos' : 'Events', href: null }
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-center relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />

      {/* Portada limpia con solo el año */}
      <YearPortada year={`${year}`} />
      
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        {eventosData ? (
          <div className="w-full space-y-16">
            <h2 
              className="text-lg md:text-3xl font-bold tracking-[0.2em] uppercase text-[#791E8F]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {eventosData.title}
            </h2>

            <div className="text-base md:text-xl leading-relaxed text-justify text-zinc-800 space-y-12 max-w-4xl mx-auto">
              {eventosData.content ? (
                <div dangerouslySetInnerHTML={{ __html: eventosData.content }} />
              ) : (
                <p className="italic opacity-50 text-center">[ Sin eventos registrados para este año ]</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-300 italic">
              {lang === 'es' ? '[ Sección en construcción ]' : '[ Section under construction ]'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}