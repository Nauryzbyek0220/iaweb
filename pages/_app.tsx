import "@/styles/globals.css";
import "public/icon/css/all.css";
import { roboto } from "@/fonts";
import Layout from "@/components/pageRender/layout";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";
import { withTranslation, WithTranslation } from "react-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#0346F2"
        startPosition={0.1}
        stopDelayMs={60}
        height={5}
        // showOnShallow={true}
      />
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <main className={`${roboto.className}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </SWRConfig>
    </>
  );
}

interface IProps extends WithTranslation {
  prop: any;
}

interface IState {
  state: any;
}

export default withTranslation()(App);
