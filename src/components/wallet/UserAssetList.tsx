import { ActionIcon, createStyles, Flex, Group, Menu, Space, Text } from "@mantine/core";
import { IconDotsVertical, IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { camelCase } from "lodash";
import { UserAssetDto } from "../../client-typescript";
import { numberToMoneyString } from "../../utils/utils-format";
import { UserAssetActionMenu } from "./UserAssetActionMenu";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,

    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    [theme.fn.largerThan("sm")]: {
      padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    },

    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  columnStackMobile: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
}));

export type UserAssetsListProps = {
  data: UserAssetDto[];
  userPreferenceCurrencySymbol: string;
};

export function UserAssetList({ data, userPreferenceCurrencySymbol }: UserAssetsListProps) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.asset.name}>
      <Flex className={classes.columnStackMobile}>
        <Text
          variant="gradient"
          size={28}
          weight={"bold"}
          style={{
            width: 60,
          }}
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        >
          {item.asset.symbol}
        </Text>
        <div>
          <Text size={"xl"} fw={600}>
            {item.asset.name.toUpperCase()}
          </Text>
          <Text size="md" fs={"italic"}>
            {camelCase(item.asset.category)}
          </Text>
        </div>
      </Flex>
      <Group>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginRight: 10,
            alignItems: "flex-end",
          }}
        >
          <Text variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} size={24} weight={600}>
            {numberToMoneyString(item.originValue)}
          </Text>
          <Text style={{ flex: 1 }} size={16} color="dimmed">
            {`${numberToMoneyString(item.userCurrencyValue)} ${userPreferenceCurrencySymbol}`}
          </Text>
        </div>
        <Space w="xs" />
        <UserAssetActionMenu asset={item.asset} />
      </Group>
    </div>
  ));

  return <div>{items}</div>;
}
