import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button, Center, createStyles, Divider, Flex, Group, Paper, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { AlertCard } from '../components/alerts/AlertCard';
import { EmptyAlertCard } from '../components/alerts/EmptyAlertCard';
import { AlertStats } from '../components/alerts/AlertStats';
import { useAPICommunication } from '../contexts/APICommunicationContext';
import { useQuery, useQueryClient } from 'react-query';
import { AddAlertButton } from '../components/alerts/AddAlertButton';

const useStyles = createStyles(() => ({
  content: {
    padding: '0.5rem',
    gap: '3rem'
  }
}));

const alert = {
  assetShortcutFrom: 'EUR',
  assetShortcutTo: 'PLN',
  value: 5,
  currentValue: 4.6782,
  gradient: 'linear-gradient(105deg, #2C3E50 10%, #4CA1AF 100%)'
};

const statsData = {
  data: [
    {
      label: 'Alerts for currencies',
      numberPending: 10,
      numberTriggered: 2
    },
    {
      label: 'Alerts for cryptocurrencies',
      numberPending: 10,
      numberTriggered: 2
    },
    {
      label: 'Alerts for metals',
      numberPending: 10,
      numberTriggered: 2
    }
  ]
};

const Alerts = () => {
  const { classes } = useStyles();
  const context = useAPICommunication();

  const alertsQuery = useQuery(['getAllAllerts'], async () => {
    return await context.allertsApi.getAllAllerts();
  });

  const assetValuesQuery = useQuery(['assetValues'], async () => {
    return await context.assetValuesApi.apiAssetValuesGet();
  });

  const statsData = useMemo(() => {
    if (alertsQuery.data === undefined) return [];

    const data = alertsQuery.data;
    return [
      {
        label: 'Alerts for currencies',
        numberPending: data.filter((alert) => alert.active && alert.originAssetType === 'currency').length,
        numberTriggered: data.filter((alert) => !alert.active && alert.originAssetType === 'currency').length
      },
      {
        label: 'Alerts for cryptocurrencies',
        numberPending: data.filter((alert) => alert.active && alert.originAssetType === 'crypto').length,
        numberTriggered: data.filter((alert) => !alert.active && alert.originAssetType === 'crypto').length
      },
      {
        label: 'Alerts for metals',
        numberPending: data.filter((alert) => alert.active && alert.originAssetType === 'metal').length,
        numberTriggered: data.filter((alert) => !alert.active && alert.originAssetType === 'metal').length
      }
    ];
  }, [alertsQuery.data]);

  const activeAlerts = useMemo(() => {
    if (alertsQuery.data === undefined) return [];

    const data = alertsQuery.data;

    return data
      .filter((allert) => allert.active)
      .map((alert) => ({
        id: alert.alertId,
        value: alert.value,
        gradient: 'linear-gradient(105deg, #2C3E50 10%, #4CA1AF 100%)',
        assetShortcutFrom: alert.originAssetName?.toUpperCase(),
        assetShortcutTo: alert.currency?.toUpperCase(),
        currentValue:
          (assetValuesQuery.data?.find((assetValue) => assetValue.assetIdentifier === alert.originAssetName)?.value ?? 1) /
          (assetValuesQuery.data?.find((assetValue) => assetValue.assetIdentifier === alert.currency)?.value ?? 1)
      }));
  }, [alertsQuery.data, assetValuesQuery.data, assetValuesQuery.data?.length]);

  const triggeredAllerts = useMemo(() => {
    if (alertsQuery.data === undefined) return [];

    const data = alertsQuery.data;

    return data
      .filter((allert) => !allert.active)
      .map((alert) => ({
        id: alert.alertId,
        value: alert.value,
        gradient: 'linear-gradient(105deg, #2C3E50 10%, #4CA1AF 100%)',
        assetShortcutFrom: alert.originAssetName?.toUpperCase(),
        assetShortcutTo: alert.currency?.toUpperCase(),
        currentValue: null
      }));
  }, [alertsQuery.data, assetValuesQuery.data, assetValuesQuery.data?.length]);

  return (
    <Layout>
      <SimpleGrid cols={3} py={'md'} px={'md'} h={'100%'} breakpoints={[{ maxWidth: 1240, cols: 1, spacing: 'md' }]}>
        <Flex direction="column">
          <AlertStats data={statsData} />
        </Flex>
        <div>
          <Paper h={'100%'} mah={'100%'} withBorder radius="md" p="sm">
            <Flex justify="center" align="center" direction="column" style={{ width: '100%' }}>
              <Flex justify="space-between" w={'100%'} px={'md'} align="center">
                <Text size={'xl'}>Pending alerts</Text>
                <AddAlertButton />
              </Flex>
              <Stack w={'100%'} pt={'md'} spacing={'xs'}>
                {activeAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    id={alert.id!}
                    assetShortcutFrom={alert.assetShortcutFrom ?? ''}
                    assetShortcutTo={alert.assetShortcutTo ?? ''}
                    value={alert.value!}
                    currentValue={alert.currentValue}
                    gradient={alert.gradient}
                  />
                ))}
              </Stack>
            </Flex>
          </Paper>
        </div>
        <div>
          <Paper style={{ height: '100%' }} withBorder radius="md" p="sm">
            <Flex justify="center" align="center" direction="column" style={{ width: '100%' }}>
              <Flex justify="space-between" w={'100%'} px={'md'} align="center">
                <Text size={'xl'}>Triggered allerts</Text>
              </Flex>
              <Stack w={'100%'} pt={'md'} spacing={'xs'}>
                {triggeredAllerts.length === 0 && <EmptyAlertCard text="No allerts were triggered" />}
                {triggeredAllerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    id={alert.id!}
                    assetShortcutFrom={alert.assetShortcutFrom ?? ''}
                    assetShortcutTo={alert.assetShortcutTo ?? ''}
                    value={alert.value!}
                    gradient={alert.gradient}
                  />
                ))}
              </Stack>
            </Flex>
          </Paper>
        </div>
      </SimpleGrid>
    </Layout>
  );
};

export default withAuthenticationRequired(Alerts, {
  onRedirecting: () => <p>Redirecting to the login page...</p>
});
