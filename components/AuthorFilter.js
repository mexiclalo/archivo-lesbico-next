'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

export default function AuthorFilter({ authors, selectedAuthor, onSelectAuthor, showTitle = false }) {
  const params = useParams();
  const lang = params?.lang || 'es';
  // Estado para rastrear qué imágenes han fallado al cargar
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (authorName) => {
    setImageErrors((prev) => ({
      ...prev,
      [authorName]: true,
    }));
  };

  // Función para obtener iniciales
  const getInitials = (name) => {
    if (name === 'SUSAN WILLIAMS') return 'S.W.';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="mb-16">
      {showTitle && authors.length > 0 && (
        <h3 className="text-center font-semibold uppercase tracking-widest text-xs text-white mb-10">
          {lang === 'es' ? 'Selección de autoras' : 'Author selection'}
        </h3>
      )}
      
      {authors.length > 0 && (
        <div className="flex justify-center items-start gap-4 md:gap-8 flex-wrap mb-8">
          {authors.map((author) => {
            const hasError = imageErrors[author.name];
            const showFallback = !author.imageUrl || hasError;

            return (
              <button
                key={author.name}
                onClick={() => onSelectAuthor(author.name)}
                className="group flex flex-col items-center gap-2 w-28 md:w-36 text-center focus:outline-none"
                title={lang === 'es' ? `Filtrar por ${author.name}` : `Filter by ${author.name}`}
              >
                <div className={`rounded-full overflow-hidden w-24 h-24 md:w-32 md:h-32 border-4 transition-all duration-300 flex items-center justify-center ${
                  selectedAuthor === author.name ? 'border-acento' : 'border-transparent group-hover:border-gray-500'
                }`}>
                  {!showFallback ? (
                    <img
                      src={author.imageUrl}
                      alt={author.name}
                      onError={() => handleImageError(author.name)}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        selectedAuthor === author.name ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                      }`}
                    />
                  ) : (
                    <div className={`w-full h-full bg-oscuro-1 flex items-center justify-center transition-all duration-300 ${
                      selectedAuthor === author.name ? 'text-acento' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      <span className="text-xl md:text-3xl font-bold tracking-tighter">
                        {getInitials(author.name)}
                      </span>
                    </div>
                  )}
                </div>
                <span className={`text-sm font-semibold transition-colors duration-300 ${
                  selectedAuthor === author.name ? 'text-acento' : 'text-white'
                }`}>{author.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex justify-center mt-16">
        <button
          onClick={() => onSelectAuthor('all')}
          className="py-2.5 px-8 rounded-lg text-xs font-semibold uppercase tracking-widest bg-transparent border border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          {lang === 'es' ? 'Mostrar toda la biblioteca' : 'Show entire library'}
        </button>
      </div>
    </div>
  );
}