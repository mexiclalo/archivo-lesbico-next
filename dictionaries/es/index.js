import { navigation } from './navigation';
import { portada } from './home/portada';
import { coyolxauhqui } from './home/coyolxauhqui';
import { bandera } from './home/bandera';
import { memoriam } from './home/memoriam';
import { presentacion } from './home/presentacion';
import { cronologia } from './home/cronologia';
import { decadas } from './home/decadas';
import { documentosPortal } from './home/documentosPortal';
import { marchasPortal } from './home/marchasPortal';
import { indoafroasiaPortal } from './home/indoafroasiaPortal';
import { eventosPortal } from './home/eventosPortal';
import { footer } from './home/footer';

// Importación de años
import { year1976 } from './cronologia/1976';
import { year1977 } from './cronologia/1977';

export const es = {
  navigation,
  home: {
    portada,
    coyolxauhqui,
    bandera,
    memoriam,
    presentacion,
    cronologia,
    decadas,
    documentosPortal,
    marchasPortal,
    indoafroasiaPortal,
    eventosPortal,
    footer
  },
  years: {
    "1976": year1976,
    "1977": year1977
  }
};