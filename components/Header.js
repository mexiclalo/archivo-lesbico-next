'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCronologiaOpen, setIsCronologiaOpen] = useState(false);
  const [openDecade, setOpenDecade] = useState(null); 
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const lang = params?.lang || 'es';

  const labels = {
    es: { chronology: 'CRONOLOGÍA', decade: 'DÉCADA' },
    en: { chronology: 'CHRONOLOGY', decade: 'DECADE' }
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
              { name: '1976', href: `/${lang}/decadas/1970/1976` },
              { name: '1977', href: `/${lang}/decadas/1970/1977` },
            ]
          }
        ] 
      },
      { name: 'DOCUMENTOS', href: `/${lang}/documentos` },
      { name: 'MARCHAS', href: `/${lang}/marchas` },
      { name: 'INDOAFROASIA', href: `/${lang}/indoafroasia` },
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
              { name: '1976', href: `/${lang}/decadas/1970/1976` },
              { name: '1977', href: `/${lang}/decadas/1970/1977` },
            ]
          }
        ] 
      },
      { name: 'DOCUMENTS', href: `/${lang}/documentos` },
      { name: 'MARCHES', href: `/${lang}/marchas` },
      { name: 'INDOAFROASIA', href: `/${lang}/indoafroasia` },
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
                  <button className="text-white hover:text-[#A165C8] transition-all flex items-center gap-1 uppercase">
                    {item.name} <span className="text-[8px] opacity-50 transition-transform group-hover:rotate-180">▼</span>
                  </button>
                  
                  {/* Dropdown Nivel 2 (Décadas): Alineado a la izquierda del botón padre */}
                  <div className="absolute top-full left-0 mt-4 w-56 bg-[#291147]/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl rounded-sm">
                    {item.submenu.map((sub) => (
                      <div key={sub.name} className="relative group/sub">
                        <div className="flex items-center justify-between hover:bg-[#8C0DC2] transition-colors">
                          <Link href={sub.href} className="flex-grow block px-6 py-4 text-white uppercase text-[10px]">
                            {sub.name}
                          </Link>
                          {sub.years && <span className="pr-4 text-white/40 text-[8px]">▶</span>}
                        </div>

                        {/* Dropdown Nivel 3 (Años): Despliega hacia la DERECHA del panel anterior */}
                        {sub.years && (
                          <div className="absolute top-0 left-full ml-[1px] w-32 bg-[#291147]/98 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-2xl rounded-sm">
                            {sub.years.map((year) => (
                              <Link 
                                key={year.name} 
                                href={year.href}
                                className="block px-6 py-3 text-white hover:bg-[#8C0DC2] transition-colors text-center text-xs"
                              >
                                {year.name}
                              </Link>
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

      {/* Mobile Menu permanece igual ya que es vertical */}
      <nav className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden fixed top-0 right-0 w-full h-screen bg-[#291147]/98 backdrop-blur-xl py-20 px-8 transition-transform duration-500 pointer-events-auto z-40 overflow-y-auto`}>
        <div className="flex flex-col space-y-6">
          {currentMenu.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div className="space-y-4">
                  <button 
                    onClick={() => setIsCronologiaOpen(!isCronologiaOpen)}
                    className="w-full text-left text-white text-lg font-bold tracking-widest flex justify-between items-center"
                  >
                    {item.name} <span>{isCronologiaOpen ? '▲' : '▼'}</span>
                  </button>
                  <div className={`${isCronologiaOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 pl-4 border-l border-white/10 space-y-4`}>
                    {item.submenu.map((sub) => (
                      <div key={sub.name} className="space-y-3">
                        <button 
                          onClick={() => setOpenDecade(openDecade === sub.name ? null : sub.name)}
                          className="w-full text-left text-white/80 text-sm font-bold tracking-widest flex justify-between items-center"
                        >
                          {sub.name} <span>{openDecade === sub.name ? '−' : '+'}</span>
                        </button>
                        <div className={`${openDecade === sub.name ? 'max-h-40 opacity-100 pb-2' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 pl-4 space-y-3`}>
                          <Link href={sub.href} onClick={closeMenu} className="block text-[#A165C8] text-xs font-black tracking-widest">➤ VER DÉCADA COMPLETA</Link>
                          {sub.years.map((year) => (
                            <Link key={year.name} href={year.href} onClick={closeMenu} className="block text-white/60 text-base font-medium">
                              {year.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={item.href} onClick={closeMenu} className="block text-white text-lg font-bold tracking-widest uppercase">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          
          <div className="flex space-x-8 mt-12 pt-12 border-t border-white/10 text-xs font-bold tracking-widest">
            <Link href="/es" onClick={closeMenu} className={`${lang === 'es' ? 'text-[#A165C8]' : 'text-white/60'}`}>ESPAÑOL</Link>
            <Link href="/en" onClick={closeMenu} className={`${lang === 'en' ? 'text-[#A165C8]' : 'text-white/60'}`}>ENGLISH</Link>
          </div>
        </div>
        <button onClick={closeMenu} className="absolute top-6 right-6 text-white text-3xl">×</button>
      </nav>
    </header>
  );
}