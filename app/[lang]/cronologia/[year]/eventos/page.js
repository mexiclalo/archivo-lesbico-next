import { getDictionary } from '../../../../../lib/get-dictionary';
import YearPortada from '../../../../../components/YearPortada';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import Timeline from '../../../../../components/Timeline';
import fs from 'fs';
import path from 'path';

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

async function getYearData(year) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'cronologia', `${year}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error(`Error loading data for year ${year}:`, error);
  }
  return null;
}

export default async function EventosYearPage({ params }) {
  const { lang, year } = await params;
  const dict = await getDictionary(lang);
  
  const timelineData = await getYearData(year);

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: year, href: `/cronologia/${year}` },
    { label: lang === 'es' ? 'Índice de Eventos' : 'Events Index', href: null }
  ];

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />

      <YearPortada year={`${year}`} />
      
      {/* Contenedor de ancho completo para que las plecas crucen toda la pantalla */}
      <div className="w-full">
        {timelineData ? (
          <div className="w-full">
            <Timeline data={timelineData} year={year} />
          </div>
        ) : (
          <div className="text-center py-20 px-6">
            <p className="text-zinc-400 italic text-xl uppercase tracking-widest">
              {lang === 'es' ? 'ÍNDICE CRONOLÓGICO DE EVENTOS' : 'CHRONOLOGICAL INDEX OF EVENTS'}
            </p>
            <p className="text-zinc-300 italic mt-8">
              {lang === 'es' ? '[ Datos no disponibles para este año ]' : '[ Data not available for this year ]'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
