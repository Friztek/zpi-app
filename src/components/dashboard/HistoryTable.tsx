import { useState } from 'react';
import { createStyles, Table, ScrollArea, Center, Loader, Text, Flex, Paper, Button, Stack, Box } from '@mantine/core';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { useQuery, useQueryClient } from 'react-query';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { dateToOffsetDate } from '../../utils/utils-format';
import { AssetDto } from '../../client-typescript';
import { sub } from 'date-fns';
import { IconCalendar, IconPlus } from '@tabler/icons';
import { openContextModal } from '@mantine/modals';
import { TransactionModalInnerProps } from '../modals/TransactionModal';
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`
    }
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  scrolled: {
    boxShadow: theme.shadows.sm
  },

  stackOnMobile: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    }
  }
}));

type HistoryTableProps = {
  assets: AssetDto[];
};

export const HistoryTable = ({ assets }: HistoryTableProps) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const dateToday = new Date();
  const dateMonthAgo = sub(dateToday, { months: 1 });

  const [dateRange, setDateRange] = useState<DateRangePickerValue>([dateMonthAgo, dateToday]);

  const context = useAPICommunication();
  const queryClient = useQueryClient();

  const transactionsData = useQuery(['transactionsDataHistory', dateRange], async () => {
    const fromDate = dateToOffsetDate(dateRange[0] ?? undefined);
    const toDate = dateToOffsetDate(dateRange[1] ?? undefined);

    const data = await context.transactionApi.apiTransactionsGet({ from: fromDate, to: toDate });
    const transactions = data.map((element) => {
      const assetData = assets.find((e) => e.name === element.assetIdentifier);
      return {
        assetIdentifier: element.assetIdentifier.toUpperCase(),
        name: assetData?.friendlyName ?? '',
        value: element.value,
        date: element.timeStamp.toLocaleDateString()
      };
    });
    return transactions;
  });

  if (transactionsData.data === undefined) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  const transactions = transactionsData.data;

  const rows = transactions.map((row, index) => (
    <tr key={index}>
      <td>{row.assetIdentifier}</td>
      <td>{row.name}</td>
      <td style={{ color: row.value > 0 ? 'green' : row.value == 0 ? '' : 'red' }}>{row.value}</td>
      <td>{row.date}</td>
    </tr>
  ));

  return (
    <Paper withBorder radius="md" h={605}>
      <Stack spacing={'sm'}>
        <Flex direction={'row'} className={classes.stackOnMobile} justify="space-between" px={'sm'} pt={'sm'}>
          <Text size="lg" weight={500}>
            Transactions history
          </Text>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<IconPlus size={14} />}
            compact
            onClick={() =>
              openContextModal({
                modal: 'transactionModal',
                title: 'Add new transaction',
                innerProps: {
                  onSubmit: async (values) => {
                    await context.userAssetsAPI.patchUserAssets({
                      patchUserAssetsDto: [
                        {
                          assetName: values.assetName,
                          description: values.origin,
                          type: 'Update',
                          value: values.value as unknown as number
                        }
                      ]
                    });
                    showNotification({
                      autoClose: 5000,
                      message: "Succesfully added new transaction",
                      styles: (theme) => ({
                        root: {
                          backgroundColor: theme.colors.blue[6],
                          borderColor: theme.colors.blue[6],
          
                          '&::before': { backgroundColor: theme.white },
                        },
          
                        title: { color: theme.white },
                        description: { color: theme.white },
                        closeButton: {
                          color: theme.white,
                          '&:hover': { backgroundColor: theme.colors.blue[7] },
                        },
                      }),
                    });
                    queryClient.invalidateQueries('transactionsDataHistory');
                    queryClient.invalidateQueries('walletTotalValue');
                  }
                } as TransactionModalInnerProps
              })
            }>
            New transaction
          </Button>
        </Flex>
        <Box px={'sm'}>
          <DateRangePicker
            aria-label="Pick date range"
            placeholder="Pick dates range"
            icon={<IconCalendar size={16} />}
            labelFormat="DD.MM.YYYY"
            inputFormat="DD.MM.YYYY"
            defaultValue={dateRange}
            required
            clearable={false}
            w={300}
            onChange={(value: DateRangePickerValue) => {
              if (value[0] === null || value[1] === null) return;
              setDateRange(() => value);
            }}
          />
        </Box>

        <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
          <Table>
            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <tr>
                <th style={{ width: '20%' }}>Asset Symbol</th>
                <th style={{ width: '25%' }}>Name</th>
                <th style={{ width: '30%' }}>Value</th>
                <th style={{ width: '25%' }}>Date</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
};
