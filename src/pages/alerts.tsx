import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { Flex, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { AlertCard } from '../components/alerts/AlertCard';
import { EmptyAlertCard } from '../components/alerts/EmptyAlertCard';
import { AlertStats } from '../components/alerts/AlertStats';
import { useAPICommunication } from '../contexts/APICommunicationContext';
import { useQuery } from 'react-query';
import { AddAlertButton } from '../components/alerts/AddAlertButton';

const Alerts = () => {
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
                {activeAlerts.length === 0 && <EmptyAlertCard text="No pending alerts" />}
                {activeAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    id={alert.id!}
                    assetShortcutFrom={alert.assetShortcutFrom ?? ''}
                    assetShortcutTo={alert.assetShortcutTo ?? ''}
                    value={alert.value!}
                    currentValue={alert.currentValue}
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
                <Text size={'xl'} mb={5}>
                  Triggered alerts
                </Text>
              </Flex>
              <Stack w={'100%'} pt={'md'} spacing={'xs'}>
                {triggeredAllerts.length === 0 && <EmptyAlertCard text="No alerts were triggered" />}
                {triggeredAllerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    id={alert.id!}
                    assetShortcutFrom={alert.assetShortcutFrom ?? ''}
                    assetShortcutTo={alert.assetShortcutTo ?? ''}
                    value={alert.value!}
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
