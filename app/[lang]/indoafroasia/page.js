import { getDictionary } from '../../../lib/get-dictionary';
import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default async function IndoafroasiaPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.indoafroasia.intro; // Ajustado a la nueva estructura modular

  const breadcrumbItems = [
    { label: dict.navigation.home, href: '/' },
    { label: dict.navigation.indoafroasia, href: null }
  ];

  const bgImage = "https://archivolesbico.yanmaria.org/Indoafroasialatinoamerica/img/portada.jpg";

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Breadcrumbs items={breadcrumbItems} light={true} />
      
      <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${bgImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-12 px-6 w-full max-w-6xl">
          <hgroup className="flex flex-col items-center">
            <h2 
              className="text-white text-sm md:text-2xl font-bold uppercase tracking-[0.5em] opacity-80 mb-4"
              style={{ 
                fontFamily: "var(--font-roboto), sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {t.subtitle}
            </h2>
            
            <h1 
              className="text-white text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-2xl leading-tight"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                textShadow: '0 4px 20px rgba(0,0,0,0.6)'
              }}
            >
              {t.title}
            </h1>
          </hgroup>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl">
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

        <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none z-20">
          <div className="flex flex-col items-center opacity-90">
            <span 
              className="text-3xl md:text-4xl leading-none font-light animate-bounce"
              style={{ color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
            >
              ︾
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}