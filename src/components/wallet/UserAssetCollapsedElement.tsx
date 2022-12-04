import { Center, createStyles, Flex, Group, Loader, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { camelCase } from 'lodash';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { getPrecisionByCategory, numberToMoneyString } from '../../utils/utils-format';
import { UserAssetActionMenu } from './UserAssetActionMenu';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`,

    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    [theme.fn.largerThan('sm')]: {
      padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`
    },

    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  },

  columnStackMobile: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    }
  },

  hideOnMobile: {
    '@media (max-width: 600px)': {
      display: 'none'
    }
  }
}));

export type CollapsedCategoryProps = {
  description: string;
  originValue: number;
  userCurrencyValue: number;
};
export type UserAssetCollapsedElementProps = {
  assetName: string;
  assetFriendlyName: string;
  symbol: string | null;
  category: string;
  totalOriginValue: number;
  totalUserCurrencyValue: number;
  userPreferedCurrencySymbol: string;
  groups: CollapsedCategoryProps[];
};

export const UserAssetCollapsedElement = ({
  assetName,
  assetFriendlyName,
  symbol,
  category,
  totalOriginValue,
  totalUserCurrencyValue,
  userPreferedCurrencySymbol,
  groups
}: UserAssetCollapsedElementProps) => {
  const { classes, theme } = useStyles();

  const context = useAPICommunication();

  const userAssetQuery = useQuery('userAsset', async () => {
    return await context.userAssetsAPI.getAllUserAssets();
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (userAssetQuery.isLoading) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  const menuData = {
    name: assetName,
    friendlyName: assetFriendlyName,
    origin: groups.length === 1 ? groups[0].description : undefined,
    symbol: symbol
  };

  const collapsedElements = groups.map((item) => (
    <div className={classes.item} key={item.description} style={{ background: 'none', marginLeft: 20 }}>
      <Flex direction="row" style={{ marginLeft: 10 }}>
        <Center>
          <Text size={'md'} fw={400}>
            {item.description}
          </Text>
        </Center>
      </Flex>
      <Group>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginRight: 10,
            alignItems: 'flex-end'
          }}>
          <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size={30} weight={600}>
            {numberToMoneyString(item.originValue, getPrecisionByCategory(category))}
          </Text>
          <Text style={{ flex: 1 }} size={16} color="dimmed">
            {`${numberToMoneyString(item.userCurrencyValue, 2)} ${userPreferedCurrencySymbol.toUpperCase()}`}
          </Text>
        </div>
        <UserAssetActionMenu
          asset={{
            name: assetName,
            friendlyName: assetFriendlyName,
            origin: item.description,
            symbol: symbol
          }}
        />
      </Group>
    </div>
  ));

  return (
    <div>
      <div className={classes.item}>
        <Flex direction="row">
          <Flex direction="column" justify="center" style={{ width: 130 }} className={classes.hideOnMobile}>
            <Text size={30} fw={700} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
              {assetName.toUpperCase()}
            </Text>
            <Text size="sm" fs={'italic'} color="dimmed">
              {camelCase(category)}
            </Text>
          </Flex>
          <Center>
            <Flex
              direction={groups.length > 1 ? 'row' : 'column'}
              align={groups.length > 1 ? 'center' : ''}
              gap={groups.length > 1 ? 'sm' : 5}>
              <Text size={'lg'} fw={400}>
                {assetFriendlyName}
              </Text>
              {groups.length > 1 ? (
                isExpanded ? (
                  <IconChevronUp size={20} onClick={() => setIsExpanded(!isExpanded)}></IconChevronUp>
                ) : (
                  <IconChevronDown size={20} onClick={() => setIsExpanded(!isExpanded)}></IconChevronDown>
                )
              ) : (
                <Text size={'md'} fw={400} color="dimmed">
                  {groups[0].description}
                </Text>
              )}
            </Flex>
          </Center>
        </Flex>
        <Group>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginRight: 10,
              alignItems: 'flex-end'
            }}>
            <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size={30} weight={600}>
              {numberToMoneyString(totalOriginValue, getPrecisionByCategory(category))}
            </Text>
            <Text style={{ flex: 1 }} size={16} color="dimmed">
              {`${numberToMoneyString(totalUserCurrencyValue, 2)} ${userPreferedCurrencySymbol.toUpperCase()}`}
            </Text>
          </div>

          <UserAssetActionMenu asset={menuData} />
        </Group>
      </div>
      {isExpanded && collapsedElements}
    </div>
  );
};
