import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid, Loader, Center } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconMinus } from '@tabler/icons';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { lastDayOfPreviousMonth } from '../../utils/date-utils';
import { numberToMoneyString } from '../../utils/utils-format';

const useStyles = createStyles((theme) => ({
  root: {
    padding: 0
  },
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

interface WalletValueProps {
  userPreferenceCurrency: string;
}

export function WalletValue({ userPreferenceCurrency }: WalletValueProps) {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const walletTotalValueQuery = useQuery('walletTotalValue', async () => {
    return await context.walletApi.apiWalletTotalGet();
  });

  const walletLastMonthTotalValueQuery = useQuery('walletLastMonthTotalValue', async () => {
    const lastDayOfMonth = lastDayOfPreviousMonth();
    return await context.walletApi.apiWalletGet({ from: lastDayOfMonth, to: lastDayOfMonth });
  });

  if (
    walletTotalValueQuery.isLoading ||
    walletTotalValueQuery.data === undefined ||
    walletLastMonthTotalValueQuery.isLoading ||
    walletLastMonthTotalValueQuery.data === undefined
  ) {
    return (
      <Paper withBorder style={{ height: 100 }} radius="md">
        <Center style={{ height: 100 }}>
          <Loader size="xl" variant="dots" />
        </Center>
      </Paper>
    );
  }

  if (walletTotalValueQuery.isLoading || walletLastMonthTotalValueQuery.isLoading) {
    return (
      <Paper style={{ height: 140 }} withBorder radius="md">
        <Center style={{ height: 130 }}>
          <Loader size="xl" variant="dots" />
        </Center>
      </Paper>
    );
  }

  const { totalValue } = walletTotalValueQuery.data;

  const diff = walletLastMonthTotalValueQuery.data[0]
    ? Math.round(((totalValue - walletLastMonthTotalValueQuery.data[0].value) / walletLastMonthTotalValueQuery.data[0].value) * 10000) / 100
    : null;

  return (
    <div className={classes.root}>
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Paper style={{ height: 140 }} withBorder p="md" radius="md">
          <div>
            <Group position="apart">
              <div>
                <Text color="dimmed" transform="uppercase" weight={700} size="xs" className={classes.label}>
                  Total value
                </Text>
                <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size="xl" weight={700} sx={{ fontSize: 30 }}>
                  {numberToMoneyString(Math.round(totalValue * 100) / 100) + ' ' + userPreferenceCurrency.toUpperCase()}
                </Text>
              </div>
              {diff && (
                <ThemeIcon
                  color="gray"
                  variant="light"
                  sx={(theme) => ({
                    color: diff! > 0 ? theme.colors.teal[6] : diff === 0 ? theme.colors.white : theme.colors.red[6]
                  })}
                  size={38}
                  radius="md">
                  {diff > 0 ? (
                    <IconArrowUpRight size={25} stroke={1.5}></IconArrowUpRight>
                  ) : diff === 0 ? (
                    <IconMinus size={25} stroke={1.5}></IconMinus>
                  ) : (
                    <IconArrowDownRight size={25} stroke={1.5}></IconArrowDownRight>
                  )}
                </ThemeIcon>
              )}
            </Group>
            {diff ? (
              <Text color="dimmed" size="sm" mt="md">
                {diff !== 0 && (
                  <Text component="span" color={diff > 0 ? 'teal' : 'red'} weight={700}>
                    {numberToMoneyString(diff)}%
                  </Text>
                )}
                {diff === 0
                  ? 'Wallet value has not changed compared to previous month'
                  : diff > 0
                  ? ' increase compared to previous month'
                  : ' decrease compared to previous month'}
              </Text>
            ) : (
              <Text color="dimmed" size="sm" mt="md">
                Wallet value has not changed compared to previous month
              </Text>
            )}
          </div>
        </Paper>
      </SimpleGrid>
    </div>
  );
}
