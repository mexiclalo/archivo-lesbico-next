import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-[100svh]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
