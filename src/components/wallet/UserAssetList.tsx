import {
  ActionIcon,
  createStyles,
  Group,
  Menu,
  Space,
  Text,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,

    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    [theme.fn.largerThan("sm")]: {
      padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    },

    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 24,
    fontWeight: 700,
    width: 70,
  },

  columnStackMobile: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
}));

interface UserAssetsListProps {
  data: {
    category: string;
    symbol: string;
    name: string;
    value: number;
    valuePrefered: number;
  }[];
}

export function UserAssetList({ data }: UserAssetsListProps) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.name}>
      <div
        style={{
          display: "flex",
        }}
        className={classes.columnStackMobile}
      >
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          className={classes.symbol}
        >
          {item.symbol}
        </Text>
        <div>
          <Text>{item.name}</Text>
          <Text size="sm">{item.category}</Text>
        </div>
      </div>
      <Group
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginRight: 10,
          }}
        >
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            size={24}
            weight={600}
          >
            {item.valuePrefered}
          </Text>
          <Text style={{ flex: 1 }} size={16} color="dimmed">
            {item.value}
          </Text>
        </div>
        <Space w="xs" />
        <Menu shadow="md" width={120}>
          <Menu.Target>
            <ActionIcon size="sm">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconPlus size={16} />}>Add</Menu.Item>
            <Menu.Item icon={<IconMinus size={16} />}>Subtract</Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={16} />}>
              Remove
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  ));

  return <div>{items}</div>;
}
