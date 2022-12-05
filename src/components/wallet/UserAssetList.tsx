import { Card, Center, Loader, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { UserAssetCollapsedElement, UserAssetCollapsedElementProps } from './UserAssetCollapsedElement';

export type UserAssetsListProps = {
  userPreferenceCurrencySymbol: string;
};

export function UserAssetList({ userPreferenceCurrencySymbol }: UserAssetsListProps) {
  const [value, setValue] = useState('all');

  const context = useAPICommunication();

  const userAssetQuery = useQuery('userAsset', async () => {
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
        userCurrencyValue: item.userCurrencyValue
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
            userCurrencyValue: item.userCurrencyValue
          }
        ]
      };
      groupedUserAssets.push(newObject);
    }
  });

  groupedUserAssets.sort((a, b) => a.assetFriendlyName.localeCompare(b.assetFriendlyName));

  groupedUserAssets.forEach((userAsset) => {
    userAsset.groups.sort((a, b) => a.description.localeCompare(b.description));
  });

  const items = groupedUserAssets
    .filter((item) => value === 'all' || item.category === value)
    .map((item) => <UserAssetCollapsedElement key={item.assetName} {...item} />);

  if (userAssetQuery.data!.length === 0) {
    return (
      <Card>
        <Center>You do not have any assets. Add new transaction and create your first asset.</Center>
      </Card>
    );
  }

  return (
    <div>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          { value: 'all', label: 'All' },
          { value: 'crypto', label: 'Crypto' },
          { value: 'currency', label: 'Currency' },
          { value: 'metal', label: 'Metal' }
        ]}
        transitionDuration={500}
        transitionTimingFunction="linear"
        color="blue"
      />
      {items}
    </div>
  );
}
