import Portada from '../../components/Portada';
import Coyolxauhqui from '../../components/Coyolxauhqui';
import Bandera from '../../components/Bandera';
import InMemoriam from '../../components/InMemoriam';
import Presentacion from '../../components/Presentacion';
import Cronologia from '../../components/Cronologia';
import Decadas from '../../components/Decadas';
import DocumentosPortal from '../../components/DocumentosPortal';
import MarchasPortal from '../../components/MarchasPortal';
import IndoafroasiaPortal from '../../components/IndoafroasiaPortal';
import EventosPortal from '../../components/EventosPortal';
import { getDictionary } from '../../lib/get-dictionary';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    alternates: {
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Portada t={dict.home.portada} />
      <Coyolxauhqui t={dict.home.coyolxauhqui} />
      <Bandera t={dict.home.bandera} />
      <InMemoriam t={dict.home.memoriam} />
      <Presentacion t={dict.home.presentacion} />
      <Cronologia t={dict.home.cronologia} />
      <Decadas t={dict.home.decadas} />
      <DocumentosPortal t={dict.home.documentosPortal} />
      <MarchasPortal t={dict.home.marchasPortal} />
      <IndoafroasiaPortal t={dict.home.indoafroasiaPortal} />
      <EventosPortal t={dict.home.eventosPortal} />
    </>
  );
}
