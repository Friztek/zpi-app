import { createStyles, Progress, Box, Text, Group, Paper, SimpleGrid, ThemeIcon } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight, IconDeviceAnalytics, IconMinus } from '@tabler/icons';
import { isFinite } from 'lodash';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { lastDayOfPreviousMonth } from '../../utils/date-utils';
import { numberToMoneyString } from '../../utils/utils-format';
import { FetchingError } from '../common/FetchingError';
import { LoaderDots } from '../common/LoaderDots';

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm
  },

  stat: {
    borderBottom: '3px solid',
    paddingBottom: 5
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: 'flex',
    alignItems: 'center'
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
  }
}));

interface WalletStatsProps {
  userPreferenceCurrency: string;
}

function calculatePart(assetValue: number, total: number): number {
  return Math.round((assetValue / total) * 10000) / 100;
}

function calculateCount(assetValue: number): number {
  return Math.round(assetValue * 100) / 100;
}

export const WalletStats = ({ userPreferenceCurrency }: WalletStatsProps) => {
  const { classes } = useStyles();
  const context = useAPICommunication();

  const walletTotalValueQuery = useQuery('walletTotalValue', async () => {
    return await context.walletApi.apiWalletTotalGet();
  });

  const walletLastMonthTotalValueQuery = useQuery('walletLastMonthTotalValue', async () => {
    const lastDayOfMonth = lastDayOfPreviousMonth();
    return await context.walletApi.apiWalletGet({ from: lastDayOfMonth, to: lastDayOfMonth });
  });

  if (walletTotalValueQuery.isError || walletLastMonthTotalValueQuery.isError) {
    return (
      <Paper withBorder style={{ height: 100 }} radius="md">
        <FetchingError h={100} />
      </Paper>
    );
  }

  if (
    walletTotalValueQuery.isLoading ||
    walletTotalValueQuery.data === undefined ||
    walletLastMonthTotalValueQuery.isLoading ||
    walletLastMonthTotalValueQuery.data === undefined
  ) {
    return (
      <Paper withBorder style={{ height: 100 }} radius="md">
        <LoaderDots h={100} />
      </Paper>
    );
  }

  const { totalValue, currencyTotalValue, cryptoTotalValue, metalTotalValue } = walletTotalValueQuery.data;

  const data = [
    {
      label: 'Currency',
      count: calculateCount(currencyTotalValue),
      part: calculatePart(currencyTotalValue, totalValue),
      color: '#136a8a'
    },
    {
      label: 'Crypto Currency',
      count: calculateCount(cryptoTotalValue),
      part: calculatePart(cryptoTotalValue, totalValue),
      color: '#267871'
    },
    {
      label: 'Metals',
      count: calculateCount(metalTotalValue),
      part: calculatePart(metalTotalValue, totalValue),
      color: '#00bf8f'
    }
  ];

  const lastMonthWalletData = walletLastMonthTotalValueQuery.data[0];

  const diff = lastMonthWalletData
    ? Math.round(((totalValue - lastMonthWalletData.value) / lastMonthWalletData.value) * 10000) / 100
    : null;

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined
  }));

  const descriptions = data.map((stat) => (
    <Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}
      </Text>
      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>
          {numberToMoneyString(stat.count)} {userPreferenceCurrency}
        </Text>
        {isFinite(stat.part) && (
          <Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
            {stat.part}%
          </Text>
        )}
      </Group>
    </Box>
  ));

  const valueDiffMessage = () => {
    if (diff === null || diff === 0) return 'Wallet value has not changed compared to previous month';

    return diff > 0
      ? `Total value of your wallet increased by ${diff}% (${numberToMoneyString(lastMonthWalletData.value)} ${userPreferenceCurrency}) 
          compared to previous month`
      : `Total value of your wallet decreased by ${diff}% (${numberToMoneyString(lastMonthWalletData.value)} ${userPreferenceCurrency}) 
          compared to previous month`;
  };

  const roundedTotalValue = Math.round(totalValue * 100) / 100;
  return (
    <Paper withBorder p="lg" radius="md">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text size="xl" weight={700}>
            {numberToMoneyString(roundedTotalValue)} {userPreferenceCurrency}
          </Text>
          {diff && (
            <Text color={diff === 0 ? 'white' : diff > 0 ? 'teal' : 'red'} className={classes.diff} size="sm" weight={700}>
              <span>{numberToMoneyString(diff)}%</span>
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
            </Text>
          )}
        </Group>
        <IconDeviceAnalytics size={20} className={classes.icon} stroke={1.5} />
      </Group>
      {roundedTotalValue !== 0 ? (
        <Text color="dimmed" size="sm" mt="md">
          {valueDiffMessage()}
        </Text>
      ) : (
        <Text size="md" weight={400}>
          Your wallet is empty, add some assets!
        </Text>
      )}
      {roundedTotalValue !== 0 && <Progress sections={segments} size={34} classNames={{ label: classes.progressLabel }} mt={'lg'} />}

      <SimpleGrid cols={1} mt="xl" mb="md">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
};
