import { getDictionary } from '../../../lib/get-dictionary';

export default async function MarchasPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="pt-24 min-h-screen bg-white font-sans">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold uppercase mb-8 border-b-2 border-black pb-4">
          {dict.navigation.marches}
        </h1>
        <div className="text-zinc-600 italic">
          [ Sección en construcción ]
        </div>
      </div>
    </main>
  );
}
