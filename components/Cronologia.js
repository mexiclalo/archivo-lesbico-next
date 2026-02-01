'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Cronologia({ t }) {
  const params = useParams();
  const lang = params?.lang || 'es';

  if (!t) return null;

  const colorMorado = '#62009A';
  const colorLila = '#8C0DC2';

  // Configuración de años activos
  const purpleYears = ["1976", "1977"];
  const lilacYears = []; // Aquí añadiremos los años que decidas marcar en lila

  const rows = [
    { decade: "1970", years: ["---", "---", "---", "---", "---", "---", "1976", "1977", "1978", "1979"] },
    { decade: "1980", years: ["1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989"] },
    { decade: "1990", years: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999"] },
    { decade: "2000", years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"] },
    { decade: "2010", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"] },
    { decade: "2020", years: ["2020", "2021", "2022"] },
  ];

  return (
    <section 
      id="cronologia"
      className="w-full py-20 px-6 bg-zinc-50 flex flex-col items-center border-t border-zinc-200"
    >
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        {/* Encabezado del Archivo */}
        <div className="text-center mb-16 space-y-2">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800 opacity-90">
            {t.archiveName}
          </p>
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-600 opacity-80">
            {t.archiveSubtitle}
          </p>
        </div>

        {/* Título de Sección */}
        <h2 
          className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase mb-12 text-center text-[#791E8F]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.title}
        </h2>

        {/* Cuerpo de Texto */}
        <div className="space-y-8 text-base leading-relaxed text-justify text-zinc-800 mb-16">
          <p>{t.p1}</p>
          <p>{t.p2}</p>

          <div className="space-y-6 pt-8">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <span className="shrink-0 px-4 py-1 text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm" style={{ backgroundColor: colorMorado }}>CLICK</span>
              <p className="text-sm md:text-base italic opacity-90">{t.clickPurple}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-4">
              <span className="shrink-0 px-4 py-1 text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm" style={{ backgroundColor: colorLila }}>CLICK</span>
              <p className="text-sm md:text-base italic opacity-90">{t.clickLilac}</p>
            </div>
          </div>
        </div>

        {/* TABLA CRONOLÓGICA */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] border border-zinc-200 bg-white rounded-sm shadow-sm">
            {/* Headers */}
            <div className="flex border-b border-zinc-200 bg-zinc-50/50 font-bold text-xs tracking-widest uppercase py-4">
              <div className="w-24 px-4 border-r border-zinc-200">{t.tableHeaders.decades}</div>
              <div className="flex-grow px-4 text-center">{t.tableHeaders.years}</div>
            </div>

            {/* Rows */}
            {rows.map((row, idx) => (
              <div key={idx} className="flex border-b border-zinc-100 last:border-0 hover:bg-zinc-50/30 transition-colors">
                <div className="w-24 px-4 py-6 flex items-center justify-center font-bold text-zinc-500 border-r border-zinc-100">
                  {row.decade}
                </div>
                
                <div className="flex-grow p-4 grid grid-cols-10 gap-2">
                  {row.years.map((year, yIdx) => {
                    const isPurple = purpleYears.includes(year);
                    const isLilac = lilacYears.includes(year);
                    const isActive = isPurple || isLilac;
                    
                    if (year === '---') {
                      return (
                        <div key={yIdx} className="aspect-square md:aspect-auto md:h-10 flex items-center justify-center text-xs font-bold text-zinc-200">
                          {year}
                        </div>
                      );
                    }

                    return isActive ? (
                      <Link 
                        key={yIdx}
                        href={`/${lang}/cronologia/${year}`}
                        className="aspect-square md:aspect-auto md:h-10 flex items-center justify-center text-xs font-bold rounded-sm transition-all text-white shadow-md hover:scale-105 active:scale-95"
                        style={{ backgroundColor: isPurple ? colorMorado : colorLila }}
                      >
                        {year}
                      </Link>
                    ) : (
                      <div 
                        key={yIdx}
                        className="aspect-square md:aspect-auto md:h-10 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-50"
                      >
                        {year}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}