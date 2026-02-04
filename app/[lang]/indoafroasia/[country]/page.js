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
  
  // Mapeo para normalizar la clave del diccionario (ej. costa-rica -> costaRica)
  const countryKey = country.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  
  // CORRECCIÓN: Acceso directo a dict.indoafroasia[countryKey]
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
      
      {/* Portada personalizada por país */}
      <YearPortada 
        title={countryData.title} 
        subtitle={countryData.subtitle}
        bgImage={countryData.bgImage}
      />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Placeholder para el diseño futuro */}
        <div className="text-center text-zinc-400 italic text-xl uppercase tracking-widest">
          {lang === 'es' ? '[ Contenido en construcción ]' : '[ Content under construction ]'}
        </div>
      </div>
    </main>
  );
}