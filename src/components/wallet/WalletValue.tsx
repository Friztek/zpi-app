import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid, Loader, Skeleton, Center } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons";
import { useQuery } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { numberToMoneyString } from "../../utils/utils-format";

const useStyles = createStyles((theme) => ({
  root: {
    padding: 0,
  },
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface WalletValueProps {
  userPreferenceCurrency: string;
}

export function WalletValue({ userPreferenceCurrency }: WalletValueProps) {
  const { classes } = useStyles();

  const context = useAPICommunication();

  var lastDayOfPrevMonth = new Date();
  lastDayOfPrevMonth.setDate(1);
  lastDayOfPrevMonth.setHours(-1);

  const walletTotalValueQuery = useQuery("walletTotalValue", async () => {
    return await context.walletApi.apiWalletTotalGet();
  });

  const walletLastMonthTotalValueQuery = useQuery("walletLastMonthTotalValue", async () => {
    const data = await context.walletApi.apiWalletGet({ from: lastDayOfPrevMonth, to: lastDayOfPrevMonth });
    return data[0].value;
  });

  if (walletTotalValueQuery.data === undefined || walletLastMonthTotalValueQuery.data === undefined) {
    return <Paper style={{height: 140}} withBorder radius="md" ><Center style={{height: 130}}><Loader size="xl" variant="dots" /></Center></Paper>;
  }

  const { totalValue } = walletTotalValueQuery.data;

  const diff =
    Math.round(((totalValue - walletLastMonthTotalValueQuery.data) / walletLastMonthTotalValueQuery.data) * 10000) /
    100;

  return (
    <div className={classes.root}>
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Paper style={{height: 140}} withBorder p="md" radius="md">
          <div>
            <Group position="apart">
              <div>
                <Text color="dimmed" transform="uppercase" weight={700} size="xs" className={classes.label}>
                  Total value
                </Text>
                <Text
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                  size="xl"
                  weight={700}
                  sx={{ fontSize: 30 }}
                >
                  {numberToMoneyString(Math.round(totalValue * 100) / 100) + " " + userPreferenceCurrency.toUpperCase()}
                </Text>
              </div>
              <ThemeIcon
                color="gray"
                variant="light"
                sx={(theme) => ({
                  color: diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
                })}
                size={38}
                radius="md"
              >
                {diff > 0 ? (
                  <IconArrowUpRight size={28} stroke={1.5}></IconArrowUpRight>
                ) : (
                  <IconArrowDownRight size={28} stroke={1.5}></IconArrowDownRight>
                )}
              </ThemeIcon>
            </Group>
            <Text color="dimmed" size="sm" mt="md">
              <Text component="span" color={diff > 0 ? "teal" : "red"} weight={700}>
                { numberToMoneyString(diff) }%
              </Text>{" "}
              {diff > 0 ? "increase" : "decrease"} compared to last month
            </Text>
          </div>
        </Paper>
      </SimpleGrid>
    </div>
  );
}
