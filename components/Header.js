'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCronologiaOpen, setIsCronologiaOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const lang = params?.lang || 'es';

  const labels = {
    es: { chronology: 'CRONOLOGÍA' },
    en: { chronology: 'CHRONOLOGY' }
  };

  const menuItems = {
    es: [
      { name: 'INICIO', href: `/${lang}` },
      { 
        name: labels.es.chronology, 
        href: '#', 
        submenu: [
          { name: '1976', href: `/${lang}/cronologia/1976` },
          { name: '1977', href: `/${lang}/cronologia/1977` },
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
          { name: '1976', href: `/${lang}/cronologia/1976` },
          { name: '1977', href: `/${lang}/cronologia/1977` },
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCronologiaOpen(false);
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
                  {/* Dropdown Desktop */}
                  <div className="absolute top-full right-0 mt-4 w-40 bg-[#291147]/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl rounded-sm">
                    {item.submenu.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.href}
                        className="block px-6 py-3 text-white hover:bg-[#8C0DC2] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href} 
                  className="text-white hover:text-[#A165C8] transition-colors uppercase"
                >
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
          onClick={toggleMenu} 
          className="md:hidden text-white bg-[#291147]/60 backdrop-blur-sm p-3 rounded-lg border border-white/10 pointer-events-auto"
        >
          {isMounted && <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden fixed top-0 right-0 w-full h-screen bg-[#291147]/98 backdrop-blur-xl py-20 px-8 transition-transform duration-500 pointer-events-auto z-40`}>
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
                  <div className={`${isCronologiaOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 pl-6 border-l border-white/10 space-y-4`}>
                    {item.submenu.map((sub) => (
                      <Link key={sub.name} href={sub.href} onClick={closeMenu} className="block text-white/70 text-base font-medium">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href} 
                  onClick={closeMenu} 
                  className="block text-white text-lg font-bold tracking-widest uppercase"
                >
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
        
        {/* Botón Cerrar Flotante en Móvil */}
        <button onClick={closeMenu} className="absolute top-6 right-6 text-white text-3xl">×</button>
      </nav>
    </header>
  );
}