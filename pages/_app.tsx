import "../styles/globals.css";
import "rsuite/dist/rsuite.min.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
