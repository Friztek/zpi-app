import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

interface DndListProps {
  data: {
    position: number;
    mass: number;
    symbol: string;
    name: string;
  }[];
}

export function UserAssetList({ data }: DndListProps) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.name}>
      <Text className={classes.symbol}>{item.symbol}</Text>
      <div>
        <Text>{item.name}</Text>
        <Text color="dimmed" size="sm">
          Position: {item.position} • Mass: {item.mass}
        </Text>
      </div>
    </div>
  ));

  return (
    <div>{items}</div>
  );
}
