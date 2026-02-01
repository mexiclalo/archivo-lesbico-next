import { getDictionary } from '../../../lib/get-dictionary';
import PageHeader from '../../../components/PageHeader';

export default async function DocumentosPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-white font-sans">
      <PageHeader title={dict.navigation.documents} />
      <div className="container mx-auto px-6 py-12">
        <div className="text-zinc-600 italic">
          [ Sección en construcción ]
        </div>
      </div>
    </main>
  );
}