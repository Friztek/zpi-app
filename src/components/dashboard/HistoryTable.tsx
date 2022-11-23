import { useEffect, useState } from "react";
import { createStyles, Table, ScrollArea, Card, Center, Loader, Text, Flex, Space } from "@mantine/core";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { useQuery, useQueryClient } from "react-query";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { dateToOffsetDate } from "../../utils/utils-format";
import { AssetDto } from "../../client-typescript";
import { sub } from "date-fns";
import { IconCalendar } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: "1rem 3rem !important",
    [theme.fn.smallerThan("md")]: {
      padding: 0,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },

  datePickerInput: {
    input: {
      width: 350,
    }
  },

  stackOnMobile: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    }
  },
}));

type HistoryTableProps = {
  assets: AssetDto[];
}


export const HistoryTable = ({ assets }: HistoryTableProps) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const dateToday = new Date();
  const dateMonthAgo = sub(dateToday, {months: 1})


  const [dateRange, setDateRange] = useState<DateRangePickerValue>([dateMonthAgo, dateToday]);

  const context = useAPICommunication();
  const queryClient = useQueryClient();

  const transactionsData = useQuery("transactionsDataHistory", async () => {
    const fromDate = dateToOffsetDate(dateRange[0] === null ? undefined : dateRange[0]);
    const toDate = dateToOffsetDate(dateRange[1] === null ? undefined : dateRange[1]);

    console.log("dateRange",dateRange)
    const data = await context.transactionApi.apiTransactionsGet({from: fromDate, to: toDate});
    const transactions = data.map((element) => {
      const assetData = assets.find((e) => e.name === element.assetIdentifier);
      return {
        assetIdentifier: element.assetIdentifier.toUpperCase(),
        name: assetData?.friendlyName ?? "",
        value: element.value,
        date: element.timeStamp.toLocaleDateString(),
      };
    });
    return transactions;
  }, );


  useEffect(() => {
    if (dateRange[0] === null || dateRange[1] === null) return;

    queryClient.invalidateQueries("transactionsDataHistory");
  }, [dateRange[0], dateRange[1], queryClient])

  if (transactionsData.data === undefined) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  const transactions = transactionsData.data;

  console.log("transactions NeW", transactions);
  const rows = transactions.map((row, index) => (
    <tr key={index}>
      <td>{row.assetIdentifier}</td>
      <td>{row.name}</td>
      <td style={{ color: row.value > 0 ? "green" : row.value == 0 ? "" : "red" }}>{row.value}</td>
      <td>{row.date}</td>
    </tr>
  ));

  return (
    <Card className={classes.card}>
      <Flex direction="row" className={classes.stackOnMobile} justify="space-between" align="center">
        <Text size="lg" weight={700}>
          Transactions history
        </Text>
        <DateRangePicker className={classes.datePickerInput} aria-label="Pick date range" placeholder="Pick dates range"  icon={<IconCalendar size={16} />} value={dateRange} onChange={(value: DateRangePickerValue) => setDateRange(() => value)} />
      </Flex>
      <Space h="sm"></Space>
      <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table sx={{ minWidth: 400 }}>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th style={{ width: "20%" }}>Asset Symbol</th>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "30%" }}>Value</th>
              <th style={{ width: "25%" }}>Date</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
};
