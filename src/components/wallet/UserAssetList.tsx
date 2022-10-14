import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconDotsVertical,
  IconMessageCircle,
  IconMinus,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings,
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
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
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
}));

interface DndListProps {
  data: {
    category: string;
    symbol: string;
    name: string;
  }[];
}

export function UserAssetList({ data }: DndListProps) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.name}>
      <div style={{ display: "flex" }}>
        <Text className={classes.symbol}>{item.symbol}</Text>
        <div>
          <Text>{item.name}</Text>
          <Text color="dimmed" size="sm">
            {item.category}
          </Text>
        </div>
      </div>
      <Group>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 8,
          }}
        >
          <Text size={24} weight={600}>
            $3004
          </Text>
          <Text size={16} color="dimmed">
            1000 zł
          </Text>
        </div>
        <Menu shadow="md" width={120}>
          <Menu.Target>
            <ActionIcon size="sm">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconPlus size={14} />}>Add</Menu.Item>
            <Menu.Item icon={<IconMinus size={14} />}>
              Subtract
            </Menu.Item>
            <Menu.Item icon={<IconTrash size={14} />}>Remove</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  ));

  return <div>{items}</div>;
}
