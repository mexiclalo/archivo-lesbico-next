'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const lang = params?.lang || 'es';

  const menuItems = {
    es: [
      { name: 'INICIO', href: `/${lang}` },
      { name: 'DOCUMENTOS', href: `/${lang}/documentos` },
      { name: 'MARCHAS', href: `/${lang}/marchas` },
      { name: 'INDOAFROASIA', href: `/${lang}/indoafroasia` },
      { name: 'EVENTOS', href: `/${lang}/eventos` },
    ],
    en: [
      { name: 'HOME', href: `/${lang}` },
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute top-0 w-full z-50 md:bg-[#291147]/60 md:backdrop-blur-sm pointer-events-none">
      <div className="container mx-auto px-6 py-4 flex justify-end items-center">
        {/* Logo eliminado para estilo minimalista */}
        
        <nav className="hidden md:flex items-center space-x-8 pointer-events-auto">
          {currentMenu.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-white hover:text-[#A165C8] transition-colors duration-300 text-xs tracking-widest font-medium"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-3 border-l border-white/20 ml-4 pl-4 text-xs tracking-widest font-medium">
            <Link href="/es" className={`${lang === 'es' ? 'text-[#A165C8]' : 'text-white/60 hover:text-white'}`}>ES</Link>
            <span className="text-white/20">|</span>
            <Link href="/en" className={`${lang === 'en' ? 'text-[#A165C8]' : 'text-white/60 hover:text-white'}`}>EN</Link>
          </div>
        </nav>

        <button 
          id="mobile-menu-button" 
          onClick={toggleMenu} 
          className="md:hidden text-white focus:outline-none bg-[#291147]/60 backdrop-blur-sm p-3 rounded-lg border border-white/10 pointer-events-auto"
        >
          {isMounted && <i id="mobile-menu-icon" className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-[#291147]/95 backdrop-blur-md py-6 px-6 border-t border-white/10 pointer-events-auto`}>
        {currentMenu.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            onClick={closeMenu} 
            className="block text-white hover:text-[#A165C8] py-3 text-xs tracking-widest font-medium"
          >
            {item.name}
          </Link>
        ))}
        <div className="flex space-x-6 mt-6 pt-6 border-t border-white/10 text-xs tracking-widest font-medium">
          <Link href="/es" onClick={closeMenu} className={`${lang === 'es' ? 'text-[#A165C8]' : 'text-white/60'}`}>ESPAÑOL</Link>
          <Link href="/en" onClick={closeMenu} className={`${lang === 'en' ? 'text-[#A165C8]' : 'text-white/60'}`}>ENGLISH</Link>
        </div>
      </nav>
    </header>
  );
}
