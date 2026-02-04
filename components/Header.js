'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCronologiaOpen, setIsCronologiaOpen] = useState(false);
  const [isIndoOpen, setIsIndoOpen] = useState(false); // Para móvil
  const [openDecade, setOpenDecade] = useState(null); 
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const lang = params?.lang || 'es';

  const labels = {
    es: { chronology: 'CRONOLOGÍA', events: 'ÍNDICE CRONOLÓGICO DE EVENTOS', indo: 'INDOAFROASIA' },
    en: { chronology: 'CHRONOLOGY', events: 'CHRONOLOGICAL EVENTS INDEX', indo: 'INDOAFROASIA' }
  };

  const menuItems = {
    es: [
      { name: 'INICIO', href: `/${lang}` },
      { 
        name: labels.es.chronology, 
        href: '#', 
        submenu: [
          { 
            name: 'DÉCADA 1970', 
            href: `/${lang}/decadas/1970`,
            years: [
              { 
                name: '1976', 
                href: `/${lang}/decadas/1970/1976`,
                items: [{ name: labels.es.events, href: `/${lang}/decadas/1970/1976/eventos` }]
              },
              { 
                name: '1977', 
                href: `/${lang}/decadas/1970/1977`,
                items: [{ name: labels.es.events, href: `/${lang}/decadas/1970/1977/eventos` }]
              },
            ]
          }
        ] 
      },
      { name: 'DOCUMENTOS', href: `/${lang}/documentos` },
      { name: 'MARCHAS', href: `/${lang}/marchas` },
      { 
        name: labels.es.indo, 
        href: `/${lang}/indoafroasia`,
        submenu: [
          { name: 'ARGENTINA', href: `/${lang}/indoafroasia/argentina` },
          { name: 'BOLIVIA', href: `/${lang}/indoafroasia/bolivia` },
          { name: 'BRASIL', href: `/${lang}/indoafroasia/brasil` },
          { name: 'CHILE', href: `/${lang}/indoafroasia/chile` },
          { name: 'COSTA RICA', href: `/${lang}/indoafroasia/costa-rica` },
          { name: 'PERÚ', href: `/${lang}/indoafroasia/peru` },
        ]
      },
      { name: 'EVENTOS', href: `/${lang}/eventos` },
    ],
    en: [
      { name: 'HOME', href: `/${lang}` },
      { 
        name: labels.en.chronology, 
        href: '#', 
        submenu: [
          { 
            name: '1970s DECADE', 
            href: `/${lang}/decadas/1970`,
            years: [
              { 
                name: '1976', 
                href: `/${lang}/decadas/1970/1976`,
                items: [{ name: labels.en.events, href: `/${lang}/decadas/1970/1976/eventos` }]
              },
              { 
                name: '1977', 
                href: `/${lang}/decadas/1970/1977`,
                items: [{ name: labels.en.events, href: `/${lang}/decadas/1970/1977/eventos` }]
              },
            ]
          }
        ] 
      },
      { name: 'DOCUMENTS', href: `/${lang}/documentos` },
      { name: 'MARCHES', href: `/${lang}/marchas` },
      { 
        name: labels.en.indo, 
        href: `/${lang}/indoafroasia`,
        submenu: [
          { name: 'ARGENTINA', href: `/${lang}/indoafroasia/argentina` },
          { name: 'BOLIVIA', href: `/${lang}/indoafroasia/bolivia` },
          { name: 'BRAZIL', href: `/${lang}/indoafroasia/brasil` },
          { name: 'CHILE', href: `/${lang}/indoafroasia/chile` },
          { name: 'COSTA RICA', href: `/${lang}/indoafroasia/costa-rica` },
          { name: 'PERU', href: `/${lang}/indoafroasia/peru` },
        ]
      },
      { name: 'EVENTS', href: `/${lang}/eventos` },
    ]
  };

  const currentMenu = menuItems[lang] || menuItems.es;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCronologiaOpen(false);
    setIsIndoOpen(false);
    setOpenDecade(null);
  };

  return (
    <header className="absolute top-0 w-full z-50 md:bg-[#291147]/60 md:backdrop-blur-sm pointer-events-none">
      <div className="container mx-auto px-6 py-4 flex justify-end items-center">
        
        <nav className="hidden md:flex items-center space-x-8 pointer-events-auto text-[10px] md:text-xs tracking-[0.2em] font-bold">
          {currentMenu.map((item) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Link href={item.href === '#' ? '#' : item.href} className="text-white hover:text-[#A165C8] transition-all uppercase">
                      {item.name}
                    </Link>
                    <span className="text-[8px] text-white/50 transition-transform group-hover:rotate-180">▼</span>
                  </div>
                  
                  {/* Dropdown Nivel 2 */}
                  <div className="absolute top-full left-0 mt-4 w-56 bg-[#291147]/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl rounded-sm">
                    {item.submenu.map((sub) => (
                      <div key={sub.name} className="relative group/sub">
                        <div className="flex items-center justify-between hover:bg-[#8C0DC2] transition-colors border-b border-white/5 last:border-0">
                          <Link href={sub.href} className="flex-grow block px-6 py-4 text-white uppercase text-[10px]">
                            {sub.name}
                          </Link>
                          {sub.years && <span className="pr-4 text-white/40 text-[8px]">▶</span>}
                        </div>

                        {/* Nivel 3 (Años) */}
                        {sub.years && (
                          <div className="absolute top-0 left-full ml-[1px] w-48 bg-[#291147]/98 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-2xl rounded-sm">
                            {sub.years.map((year) => (
                              <div key={year.name} className="relative group/year">
                                <div className="flex items-center justify-between hover:bg-[#8C0DC2] transition-colors border-b border-white/5 last:border-0">
                                  <Link href={year.href} className="flex-grow block px-6 py-3 text-white text-xs">
                                    {year.name}
                                  </Link>
                                  {year.items && <span className="pr-4 text-white/40 text-[8px]">▶</span>}
                                </div>

                                {/* Nivel 4 (Eventos) */}
                                {year.items && (
                                  <div className="absolute top-0 left-full ml-[1px] w-64 bg-[#291147]/99 backdrop-blur-xl border border-white/10 opacity-0 invisible group-hover/year:opacity-100 group-hover/year:visible transition-all duration-300 shadow-2xl rounded-sm">
                                    {year.items.map((eItem) => (
                                      <Link key={eItem.name} href={eItem.href} className="block px-6 py-4 text-white hover:bg-[#8C0DC2] transition-colors text-[9px] uppercase tracking-widest leading-tight">
                                        {eItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={item.href} className="text-white hover:text-[#A165C8] transition-colors uppercase">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          
          <div className="flex items-center space-x-3 border-l border-white/20 ml-4 pl-4 font-bold">
            <Link href="/es" className={`${lang === 'es' ? 'text-[#A165C8]' : 'text-white/60 hover:text-white'}`}>ES</Link>
            <span className="text-white/20">|</span>
            <Link href="/en" className={`${lang === 'en' ? 'text-[#A165C8]' : 'text-white/60 hover:text-white'}`}>EN</Link>
          </div>
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white bg-[#291147]/60 backdrop-blur-sm p-3 rounded-lg border border-white/10 pointer-events-auto"
        >
          {isMounted && <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden fixed top-0 right-0 w-full h-screen bg-[#291147]/98 backdrop-blur-xl py-20 px-8 transition-transform duration-500 pointer-events-auto z-40 overflow-y-auto`}>
        <div className="flex flex-col space-y-6">
          {currentMenu.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      if(item.name === labels[lang].chronology) setIsCronologiaOpen(!isCronologiaOpen);
                      if(item.name === labels[lang].indo) setIsIndoOpen(!isIndoOpen);
                    }} 
                    className="w-full text-left text-white text-lg font-bold tracking-widest flex justify-between items-center"
                  >
                    {item.name} <span>{(item.name === labels[lang].chronology ? isCronologiaOpen : isIndoOpen) ? '▲' : '▼'}</span>
                  </button>
                  
                  {/* Acordeón para Cronología */}
                  {item.name === labels[lang].chronology && (
                    <div className={`${isCronologiaOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 pl-4 border-l border-white/10 space-y-4`}>
                      {item.submenu.map((sub) => (
                        <div key={sub.name} className="space-y-3">
                          <button onClick={() => setOpenDecade(openDecade === sub.name ? null : sub.name)} className="w-full text-left text-white/80 text-sm font-bold tracking-widest flex justify-between items-center">
                            {sub.name} <span>{openDecade === sub.name ? '−' : '+'}</span>
                          </button>
                          <div className={`${openDecade === sub.name ? 'max-h-[1000px] opacity-100 pb-2' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 pl-4 space-y-4`}>
                            <Link href={sub.href} onClick={closeMenu} className="block text-[#A165C8] text-xs font-black tracking-widest">➤ VER DÉCADA COMPLETA</Link>
                            {sub.years.map((year) => (
                              <div key={year.name} className="space-y-2">
                                <Link href={year.href} onClick={closeMenu} className="block text-white text-base font-medium">{year.name}</Link>
                                {year.items && year.items.map(eItem => (
                                  <Link key={eItem.name} href={eItem.href} onClick={closeMenu} className="block text-white/50 text-xs pl-4 uppercase tracking-tighter">— {eItem.name}</Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Acordeón para Indoafroasia */}
                  {item.name === labels[lang].indo && (
                    <div className={`${isIndoOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 pl-4 border-l border-white/10 space-y-4`}>
                      <Link href={item.href} onClick={closeMenu} className="block text-[#A165C8] text-xs font-black tracking-widest">➤ VER PORTAL COMPLETO</Link>
                      {item.submenu.map((sub) => (
                        <Link key={sub.name} href={sub.href} onClick={closeMenu} className="block text-white/70 text-base font-medium uppercase tracking-widest">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href} onClick={closeMenu} className="block text-white text-lg font-bold tracking-widest uppercase">{item.name}</Link>
              )}
            </div>
          ))}
        </div>
        <button onClick={closeMenu} className="absolute top-6 right-6 text-white text-3xl">×</button>
      </nav>
    </header>
  );
}