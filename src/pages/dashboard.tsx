import React from 'react';
import { Layout } from '../components/layout/Layout';
import { BrushChart } from '../components/dashboard/BrushChart';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { AssetsCarousel } from '../components/dashboard/AssetsCarousel';
import { Flex, Grid, Stack } from '@mantine/core';
import { WalletStats } from '../components/dashboard/WalletStats';
import { HistoryTable } from '../components/dashboard/HistoryTable';
import { useAPICommunication } from '../contexts/APICommunicationContext';
import { useQuery } from 'react-query';
import { orderBy } from 'lodash';
import { LoaderDots } from '../components/common/LoaderDots';
import { FetchingError } from '../components/common/FetchingError';

const Dashboard = () => {
  const context = useAPICommunication();

  const walletHistoryData = useQuery('walletHistory', async () => {
    const data = await context.walletApi.apiWalletGet();
    return orderBy(data, (wallet) => wallet.dateStamp);
  });

  const assetsData = useQuery('assets', async () => {
    return await context.assetsAPI.getAllAssets();
  });

  const userPreferenceQuery = useQuery('userPreferences', async () => {
    return await context.userPreferenceAPI.getUserPreferences();
  });

  if (walletHistoryData.isError || userPreferenceQuery.isError || assetsData.isError) {
    return (
      <Layout>
        <FetchingError h={'80vh'} />
      </Layout>
    );
  }

  if (walletHistoryData.data === undefined || userPreferenceQuery.data === undefined || assetsData.data === undefined) {
    return (
      <Layout>
        <LoaderDots h={'80vh'} />
      </Layout>
    );
  }

  const walletData = walletHistoryData.data.map((row) => [row.dateStamp.getTime(), row.value]);

  return (
    <div style={{ maxHeight: '100vh' }}>
      <Layout>
        <Grid gutter={'md'} pt={'lg'} pl={'md'} maw={'100%'} mah={'100%'} h={'100%'} justify="space-between">
          <Grid.Col lg={8} mah={'100%'}>
            <Stack justify={'space-between'} h={'100%'}>
              <BrushChart data={walletData} />
              <AssetsCarousel assets={assetsData.data} userPreferenceCurrency={userPreferenceQuery.data.preferenceCurrency} />
            </Stack>
          </Grid.Col>
          <Grid.Col lg={4} mah={'100%'} maw={'100%'}>
            <Stack h="100%" mah={'100%'} maw={'100%'}>
              <WalletStats userPreferenceCurrency={userPreferenceQuery.data.preferenceCurrency.toUpperCase()} />
              <HistoryTable assets={assetsData.data} />
            </Stack>
          </Grid.Col>
        </Grid>
      </Layout>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting to the login page...</p>
});
