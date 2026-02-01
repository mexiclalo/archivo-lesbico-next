import '../../styles/globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDictionary } from '../../lib/get-dictionary';

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const baseUrl = 'https://archivolesbico.yanmaria.org';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: lang === 'es' 
        ? 'Archivo Histórico del Movimiento Feminista de Lesbianas en México' 
        : 'Historical Archive of the Feminist Lesbian Movement in Mexico',
      template: `%s | ${lang === 'es' ? 'AHMFLM-YMY' : 'AHMFLM-YMY'}`
    },
    description: lang === 'es' 
      ? 'Archivo histórico de Yan María Yaoyólotl (AHMFLM-YMY)' 
      : 'Historical archive of Yan María Yaoyólotl (AHMFLM-YMY)',
    alternates: {
      languages: {
        'es': `/es`,
        'en': `/en`,
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <html lang={lang}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        {/* Anti-cache meta tags */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
