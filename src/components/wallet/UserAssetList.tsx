import { Card, Center, createStyles, Loader } from "@mantine/core";
import { useQuery } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { UserAssetCollapsedElement, UserAssetCollapsedElementProps } from "./UserAssetCollapsedElement";

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
  userPreferenceCurrencySymbol: string;
};

export function UserAssetList({ userPreferenceCurrencySymbol }: UserAssetsListProps) {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const userAssetQuery = useQuery("userAsset", async () => {
    return await context.userAssetsAPI.getAllUserAssets();
  });

  if (userAssetQuery.isLoading) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  var groupedUserAssets: UserAssetCollapsedElementProps[] = [];

  userAssetQuery.data!.forEach((item) => {
    const found = groupedUserAssets.find((e) => e.assetName === item.asset.name);
    if (found) {
      const newGroupObject = {
        description: item.description,
        originValue: item.originValue,
        userCurrencyValue: item.userCurrencyValue,
      };
      found.totalOriginValue += item.originValue;
      found.totalUserCurrencyValue += item.userCurrencyValue;
      found.groups.push(newGroupObject);
    } else {
      const newObject = {
        assetName: item.asset.name,
        assetFriendlyName: item.asset.friendlyName,
        symbol: item.asset.symbol,
        category: item.asset.category,
        totalOriginValue: item.originValue,
        totalUserCurrencyValue: item.userCurrencyValue,
        userPreferedCurrencySymbol: userPreferenceCurrencySymbol,
        groups: [
          {
            description: item.description,
            originValue: item.originValue,
            userCurrencyValue: item.userCurrencyValue,
          },
        ],
      };
      groupedUserAssets.push(newObject);
    }
  });

  const items = groupedUserAssets.map((item) => (
    <UserAssetCollapsedElement
      key={item.assetName}
      {...item}
    />
  ));

  if (userAssetQuery.data!.length === 0) {
    return (
      <Card>
        <Center>You do not have any assets. Add new transaction and create your first asset.</Center>
      </Card>
    );
  }

  return <div>{items}</div>;
}
