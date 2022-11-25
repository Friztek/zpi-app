import { AppProps } from "next/app";
import Head from "next/head";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { APICommunicationContextProvider } from "../contexts/APICommunicationContext";
import { ModalsProvider } from "@mantine/modals";
import { useLocalStorage } from "@mantine/hooks";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnMount: false } },
});

export default function App(props: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = () => setColorScheme((current: string) => (current === "dark" ? "light" : "dark"));

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ZPI APP</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* TODO add env */}
      <Auth0Provider
        domain="how-money.eu.auth0.com"
        clientId="qEgsNhsWSbKXXWNjNuaS2JrV1RRBHvFX"
        redirectUri={"http://localhost:3000"}
        audience="https://how-money.com"
        cacheLocation="localstorage"
      >
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
            }}
          >
            <ModalsProvider>
              <APICommunicationContextProvider>
                <QueryClientProvider client={queryClient}>
                  <Component {...pageProps} />
                </QueryClientProvider>
              </APICommunicationContextProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Auth0Provider>
    </>
  );
}
