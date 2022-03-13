//node_modules
import { AppProps } from "next/app";
import { useEffectOnce } from "react-use";
import { SSRProvider } from "@react-aria/ssr";
import Head from "next/head";

//components
import LoadingBarComponent from "src/components/loading-bar-component";

//secret
import secretFunction from "libs/secret";

//styles
import "src/styles/global/app/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//configs
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffectOnce(secretFunction);

  //TODO remove after final production build
  useEffectOnce(() => {
    navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      })
      .catch(function (err) {
        console.log("Service Worker registration failed: ", err);
      });
  });

  return (
    <SSRProvider>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <LoadingBarComponent />
      <Component {...pageProps} />
    </SSRProvider>
  );
};

export default MyApp;
