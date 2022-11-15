import { RingProgress, Text, SimpleGrid, Paper, Group, createStyles, Space } from "@mantine/core";

const useStyles = createStyles(() => ({
  text: {
    opacity: 0.7,
    fontWeight: 500,
  },
  stats: {
    "@media (max-width: 600px)": {
        display: "none"
      },
  }
}));

interface StatsRingProps {
  data: {
    label: string;
    numberPending: number;
    numberTriggered: number;
  }[];
}

export const AlertStats = ({ data }: StatsRingProps) => {
  const { classes, theme } = useStyles();

  const stats = data.map((stat) => {
    return (
      <Paper withBorder radius="md" p="xs" style={{paddingTop: 25, paddingBottom: 25}} key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[
              { value: (stat.numberTriggered / (stat.numberPending + stat.numberTriggered)) * 100, color: "green" },
            ]}
          />

          <div>
            <Text color={theme.white[0]} size="md" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.numberPending + stat.numberTriggered}
            </Text>
            <Space h="lg"></Space>
            <Text className={classes.text} weight={400} size="sm" color={theme.colorScheme === "dark" ? "#00dbff" : "#228be6"}>
              {"Pending " + stat.numberPending}
            </Text>
            <Text className={classes.text} weight={400} size="sm" color={theme.colorScheme === "dark" ? "#4fe16a" : "#06801c"}>
              {"Triggered " + stat.numberTriggered}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid style={{width: "100%"}} className={classes.stats} cols={1}  breakpoints={[
        { maxWidth: 1240, cols: 3, spacing: "md" },
      ]}>
      {stats}
    </SimpleGrid>
  );
};
