import { navigation } from './navigation';
import { ui } from './ui';
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

import { year1976 } from './cronologia/1976';
import { year1977 } from './cronologia/1977';
import { decade1970 } from './decadas/1970';
import { documentos } from './documentos';

// Estructura modular completa para Indoafroasia
import { intro as indoIntro } from './indoafroasia/index';
import { argentina as indoArgentina } from './indoafroasia/argentina';
import { bolivia as indoBolivia } from './indoafroasia/bolivia';
import { brasil as indoBrasil } from './indoafroasia/brasil';
import { chile as indoChile } from './indoafroasia/chile';
import { costaRica as indoCostaRica } from './indoafroasia/costa-rica';
import { peru as indoPeru } from './indoafroasia/peru';

export const es = {
  navigation,
  ui,
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
  },
  decadasData: {
    "1970": decade1970
  },
  documentos,
  indoafroasia: {
    intro: indoIntro,
    argentina: indoArgentina,
    bolivia: indoBolivia,
    brasil: indoBrasil,
    chile: indoChile,
    costaRica: indoCostaRica,
    peru: indoPeru
  }
};