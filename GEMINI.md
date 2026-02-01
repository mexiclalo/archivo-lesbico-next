# Instrucciones del Proyecto: Archivo Histórico AHMFLM-YMY (Next.js)

Este documento contiene la arquitectura, decisiones de diseño y flujos de trabajo para el **Archivo histórico del movimiento feminista de lesbianas en México Yan María Yaoyólotl (AHMFLM-YMY)**.

## REGLA FUNDAMENTAL DE TRABAJO
- **PROHIBIDO USAR EL TOOL `replace`**: Este tool es lento y propenso a errores de coincidencia. Para cualquier modificación de código, se debe usar primero `read_file` para obtener el contenido completo y luego `write_file` para sobreescribir el archivo con los cambios.

## Identidad y Paleta de Colores
- **Portada**: Color sólido `#291147`.
- **Botones y Acentos**: `#8C0DC2`.
- **Footer**: `#2A1346`.
- **Páginas Internas (Headers)**: Degradado superior `#A165C8` e inferior `#63009B`.
- **Sección Alaíde Foppa**: Fondo degradado `#6E542A` (izq) a `#CCC6BF` (der) con letra color `#36270A`.

## Estructura de la Página de Inicio (Home)
1. **PORTADA**: Identidad principal del archivo.
2. **COYOLXAUHQUI REARTICULADA**: Sección artística/simbólica.
3. **IN MEMORIAM, ALAÍDE FOPPA**: Homenaje y semblanza.
4. **PRESENTACIÓN**: Introducción institucional del archivo.
5. **DESARROLLO CRONOLÓGICO**: Línea de tiempo histórica.
6. **DÉCADAS**: Acceso rápido por periodos de tiempo.

## Páginas Internas
- **DOCUMENTOS RELEVANTES**: `/documentos`
- **MARCHAS LÉSBICAS**: `/marchas`
- **INDOAFROASIALATINOAMÉRICA**: `/indoafroasia`
- **ANUNCIOS Y EVENTOS**: `/eventos`

## Decisiones Técnicas
- **Unidades svh**: Se utiliza `100svh` para alturas de pantalla completa para asegurar estabilidad en navegadores móviles.
- **Traducción**: El sitio es bilingüe (ES/EN) utilizando diccionarios en `/dictionaries`.
- **Navegación Fluida**: Se utiliza `window.history.pushState` para evitar el salto automático al inicio.
