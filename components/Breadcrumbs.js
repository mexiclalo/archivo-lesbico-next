'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Breadcrumbs({ items, light = false }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  return (
    <nav className="absolute top-24 left-6 md:left-12 z-50 flex items-center gap-2 font-sans">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <span className={`text-[10px] ${light ? 'text-white/30' : 'text-zinc-300'}`}>/</span>
          )}
          {item.href ? (
            <Link 
              href={`/${lang}${item.href}`}
              className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all hover:opacity-100 ${
                light ? 'text-white/60 hover:text-white' : 'text-zinc-400 hover:text-[#8C0DC2]'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ${
              light ? 'text-white' : 'text-[#8C0DC2]'
            }`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
