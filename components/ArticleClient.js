'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const renderContent = (contentItem, index, theme) => {
  const imageFigcaptionColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  switch (contentItem.type) {
    case 'paragraph':
      return <p key={index} dangerouslySetInnerHTML={{ __html: contentItem.text }} />;
    case 'image':
      return (
        <figure key={index} className="my-8 text-center">
          <img src={contentItem.src} alt={contentItem.figcaption || 'Imagen del artículo'} className="max-w-full h-auto mx-auto rounded-lg shadow-lg" />
          {contentItem.figcaption && (
            <figcaption className={`mt-4 text-sm ${imageFigcaptionColor} italic`}>{contentItem.figcaption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
};

export default function ArticleClient({ articleData, lang }) {
  const [theme, setTheme] = useState('dark');
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Lógica de visualización flexible para soportar diferentes estructuras de datos
  let displayData;
  if (articleData.bilingual && articleData[currentLang]) {
    displayData = articleData[currentLang];
  } else if (articleData[`title_${currentLang}`]) {
    displayData = {
      title: articleData[`title_${currentLang}`],
      content: articleData[`content_${currentLang}`] || articleData.content,
      author: articleData[`author_${currentLang}`] || articleData.author
    };
  } else {
    // Fallback al objeto principal (usualmente español)
    displayData = articleData;
  }

  const dict = {
    es: {
      backLibrary: '← VOLVER A LA BIBLIOTECA',
      backBook: (title) => `← VOLVER A: ${title}`,
      readIn: 'Read in English',
      themeTitle: 'Cambiar modo de lectura'
    },
    en: {
      backLibrary: '← BACK TO LIBRARY',
      backBook: (title) => `← BACK TO: ${title}`,
      readIn: 'Leer en Español',
      themeTitle: 'Change reading mode'
    }
  };

  const t = dict[currentLang] || dict.es;

  const backLink = articleData.parentBook 
    ? { href: `/${lang}/libros/${articleData.parentBook.slug}`, text: t.backBook(articleData.parentBook.title) }
    : { href: `/${lang}/libros`, text: t.backLibrary };

  const isMenBook = articleData.parentBook?.category === 'men';
  const mainBg = theme === 'dark' 
    ? (isMenBook ? 'bg-fondo-libro-3' : 'bg-fondo-analisis') 
    : 'bg-white';
  const mainText = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const headerBorder = theme === 'dark' ? 'border-gray-500' : 'border-gray-300';
  const backLinkColor = theme === 'dark' ? 'text-gray-300 hover:text-acento' : 'text-gray-600 hover:text-red-700';
  const buttonTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <main className={`${mainBg} ${mainText} flex-grow transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-12">
        
        <div className="flex justify-between items-center mb-8 relative z-[60]">
          <Link href={backLink.href} className={`${backLinkColor} transition-colors duration-300 inline-flex items-center font-semibold`}>
              {backLink.text}
          </Link>

          <div className="flex items-center gap-4">
            {articleData.bilingual && (
              <button 
                onClick={() => setCurrentLang(currentLang === 'es' ? 'en' : 'es')}
                className={`${buttonTextColor} font-semibold py-2 px-4 rounded-lg hover:bg-gray-500/20 transition-all duration-300`}
                title={t.readIn}
              >
                {t.readIn}
              </button>
            )}
            <button 
              onClick={toggleTheme}
              className={`${buttonTextColor} font-semibold py-2 px-4 rounded-lg hover:bg-gray-500/20 transition-all duration-300 inline-flex items-center gap-2`}
              title={t.themeTitle}
            >
              {theme === 'dark' 
                ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              }
            </button>
          </div>
        </div>

        <article>
          <header className={`mb-12 text-center border-b ${headerBorder} pb-8`}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {displayData.title}
            </h1>
          </header>
          
          <div className={`${subText} text-lg space-y-8 text-justify font-light`}>
            {displayData.content.map((item, index) => renderContent(item, index, theme))}
          </div>
        </article>

      </div>
    </main>
  );
}
