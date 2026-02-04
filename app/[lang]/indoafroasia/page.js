import { getDictionary } from '../../../lib/get-dictionary';
import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';
import YearPortada from '../../../components/YearPortada';

export default async function IndoafroasiaPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.indoafroasia.intro;

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: dict.navigation.indoafroasia, href: null }
  ];

  const bgImage = "https://archivolesbico.yanmaria.org/Indoafroasialatinoamerica/img/portada.jpg";

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />
      
      {/* Portada usando el componente YearPortada con modo isCover */}
      <YearPortada 
        title={t.title}
        subtitle={t.subtitle}
        bgImage={bgImage}
        isCover={true} 
      />

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {t.countries.map((country) => (
            <Link 
              key={country.name}
              href={`/${lang}${country.href}`}
              className="group relative flex items-center justify-center px-6 py-4 bg-[#8C0DC2]/80 backdrop-blur-sm text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-[#8C0DC2] hover:scale-105 active:scale-95 transition-all border border-white/20"
            >
              <span className="absolute left-6 text-lg group-hover:translate-x-1 transition-transform">➤</span>
              <span className="text-center">{country.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}