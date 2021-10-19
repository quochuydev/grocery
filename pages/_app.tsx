import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/ticket.css";
import "../styles/bootstrap.min.css";
import "../styles/owl.carousel.min.css";

import config from "../utils/config";
console.log(process.env.NODE_ENV);
console.log("SERVER_URL", process.env.SERVER_URL);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
