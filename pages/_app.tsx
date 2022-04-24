import '../styles/globals.css'
import 'rsuite/dist/rsuite.min.css';
import type { AppProps } from 'next/app'
import { CustomProvider } from 'rsuite';

function App({ Component, pageProps }: AppProps) {
  return <CustomProvider theme="dark"><Component {...pageProps} /></CustomProvider>;
}

export default App
