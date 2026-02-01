# Instrucciones del Proyecto: Feminismo Socialista (Next.js)

Este documento contiene un resumen de la arquitectura, decisiones de diseño y flujos de trabajo para el mantenimiento del sitio.

## Arquitectura de la Biblioteca de Libros

La sección de la biblioteca (`/libros`) está construida con una arquitectura de sitio estático de Next.js para maximizar la velocidad y el SEO.

### 1. Fuente de Datos
- **Ubicación:** Todos los datos de los libros residen en la carpeta `/data`.
- **Archivos Individuales:** Cada libro tiene su propio archivo `[año]-[titulo-slug].json`.
- **Índice Principal:** El archivo `/data/index.json` actúa como el índice principal. Contiene una lista ordenada de los nombres de archivo de cada libro. **El orden en este archivo determina el orden en que aparecen los libros en la biblioteca.**

### 2. Capa de Datos (`/lib/books.js`)
- Este archivo es el "cerebro" que se encarga de leer y procesar los datos de los libros.
- **`getAllBookData()`:** Lee el `index.json` y luego cada archivo de libro para devolver una lista completa de todos los libros.
- **`getBookData(slug)`:** Devuelve los datos para un solo libro.
- **`getAllBookSlugs()`:** Devuelve todos los "slugs" (identificadores) para la generación de páginas dinámicas.
- **Estandarización de Datos:** Este archivo también se encarga de estandarizar los datos para la visualización. Actualmente, convierte todos los **títulos, subtítulos y nombres de autor a MAYÚSCULAS** antes de enviarlos a las páginas.

### 3. Generación de Páginas
- **Página de la Biblioteca (`/pages/libros.js`):**
  - Usa `getStaticProps` para cargar todos los libros al momento de construir el sitio.
  - Renderiza la cuadrícula de tarjetas de libros.
  - Contiene la lógica del filtro visual por autoras.
- **Páginas de Libros Individuales (`/pages/libros/[slug].js`):**
  - Es una ruta dinámica.
  - Usa `getStaticPaths` para generar una URL única para cada libro (ej: `/libros/1981-mujeres-raza-y-clase`).
  - Usa `getStaticProps` para obtener los datos del libro correspondiente a esa URL.

## Flujos de Trabajo Comunes

### Añadir un Nuevo Libro
1.  Crea el nuevo archivo JSON del libro dentro de la carpeta `/data`.
2.  Añade el nombre de ese nuevo archivo al final (o en la posición deseada) de la lista en `/data/index.json`.
3.  La próxima vez que el sitio se construya, el nuevo libro aparecerá automáticamente.

### Modificar el Filtro de Autoras
1.  Abre el archivo `/pages/libros.js`.
2.  Busca la constante `authorsToFeature`. Este array define qué autoras aparecen en el filtro visual.
3.  Para **añadir** una autora, agrega un nuevo objeto al array:
    ```javascript
    { name: 'Nombre Completo', aliases: ['alias1', 'alias2'], imageUrl: 'URL_DE_LA_IMAGEN' }
    ```
    - `name`: El nombre que se mostrará.
    - `aliases`: Una lista de textos (en minúsculas y sin acentos) para buscar. Usualmente, el apellido es suficiente. Esto es crucial para que el filtro encuentre todas las variaciones del nombre.
    - `imageUrl`: El enlace a la foto.
4.  Para **quitar** una autora, simplemente elimina su objeto del array.

## Decisiones Arquitectónicas Importantes

- **Sin Caché de Datos:** Se decidió no utilizar un sistema de caché de datos (`book-cache.json`) para simplificar el mantenimiento. El sistema **siempre lee los archivos originales** de la carpeta `/data` al construir el sitio. Esto asegura que cualquier cambio en los datos se refleja automáticamente, sin necesidad de regenerar un caché manualmente.
- **Transformación de Datos en `lib/books.js`:** Para mantener la consistencia visual, la conversión de textos a mayúsculas se realiza en la capa de datos (`lib/books.js`), no en los componentes. Esto mantiene los archivos JSON originales intactos.
