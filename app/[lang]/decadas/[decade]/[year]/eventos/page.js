import { getDictionary } from '../../../../../../lib/get-dictionary';
import YearPortada from '../../../../../../components/YearPortada';
import Breadcrumbs from '../../../../../../components/Breadcrumbs';
import Timeline from '../../../../../../components/Timeline';
import fs from 'fs';
import path from 'path';

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

async function getYearData(year, lang) {
  try {
    const fileName = lang === 'en' ? `${year}_en.json` : `${year}.json`;
    const realPath = path.join(process.cwd(), 'data', 'cronologia', fileName);

    if (fs.existsSync(realPath)) {
      const fileContent = fs.readFileSync(realPath, 'utf8');
      return JSON.parse(fileContent);
    } else if (lang === 'en') {
      const esPath = path.join(process.cwd(), 'data', 'cronologia', `${year}.json`);
      if (fs.existsSync(esPath)) {
        const fileContent = fs.readFileSync(esPath, 'utf8');
        return JSON.parse(fileContent);
      }
    }
  } catch (error) {
    console.error(`Error loading data for year ${year} in ${lang}:`, error);
  }
  return null;
}

export default async function EventosYearPage({ params }) {
  const { lang, decade, year } = await params;
  const dict = await getDictionary(lang);
  
  const timelineData = await getYearData(year, lang);
  const eventosSubtitle = lang === 'es' ? 'EVENTOS' : 'EVENTS';

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: decade, href: `/decadas/${decade}` },
    { label: year, href: `/decadas/${decade}/${year}` },
    { label: lang === 'es' ? 'Eventos' : 'Events', href: null }
  ];

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />

      <YearPortada title={year} subtitle={eventosSubtitle} />
      
      <div className="w-full">
        {timelineData ? (
          <div className="w-full">
            <Timeline data={timelineData} year={year} ui={dict.ui} />
          </div>
        ) : (
          <div className="text-center py-20 px-6">
            <p className="text-zinc-400 italic text-xl uppercase tracking-widest">
              {eventosSubtitle}
            </p>
            <p className="text-zinc-300 italic mt-8">
              {dict.ui?.noEvents || '[ Datos no disponibles ]'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}