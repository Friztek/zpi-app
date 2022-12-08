import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from '@mantine/core';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { APICommunicationContextProvider } from '../contexts/APICommunicationContext';
import { ModalsProvider } from '@mantine/modals';
import { useLocalStorage } from '@mantine/hooks';
import { TransactionModal } from '../components/modals/TransactionModal';
import { PreferencesModal } from '../components/dashboard/PreferencesModal';
import { useUrl } from '../hooks/useUrl';
import { NotificationsProvider } from '@mantine/notifications';
import { AddAlertModal } from '../components/alerts/AddAlertModal';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnMount: false } }
});

export default function App(props: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light'
  });

  const toggleColorScheme = () => setColorScheme((current: string) => (current === 'dark' ? 'light' : 'dark'));

  const { Component, pageProps } = props;

  const url = useUrl();
  return (
    <>
      <Head>
        <title>How money</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Auth0Provider
        domain="how-money.eu.auth0.com"
        clientId="qEgsNhsWSbKXXWNjNuaS2JrV1RRBHvFX"
        redirectUri={url}
        audience="https://how-money.com"
        cacheLocation="localstorage">
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
              globalStyles: (theme) => ({
                '*, *::before, *::after': {
                  boxSizing: 'border-box'
                },

                body: {
                  ...theme.fn.fontStyles(),
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                  lineHeight: theme.lineHeight
                }
              })
            }}>
            <NotificationsProvider>
              <APICommunicationContextProvider>
                <QueryClientProvider client={queryClient}>
                  <ModalsProvider modals={{ transactionModal: TransactionModal, alertModal: AddAlertModal }}>
                    <Component {...pageProps} />
                    <PreferencesModal />
                  </ModalsProvider>
                </QueryClientProvider>
              </APICommunicationContextProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Auth0Provider>
    </>
  );
}
