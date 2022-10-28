import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export default function App(props: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ZPI APP</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* TODO add env */}
      <Auth0Provider
        domain="how-money.eu.auth0.com"
        clientId="qEgsNhsWSbKXXWNjNuaS2JrV1RRBHvFX"
        redirectUri={"http://localhost:3000"}
        audience="https://how-money.com"
        cacheLocation="localstorage"
      >
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </Auth0Provider>
    </>
  );
}
