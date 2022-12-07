import { ActionIcon, Menu, Text, Space } from '@mantine/core';
import { openConfirmModal, openContextModal } from '@mantine/modals';
import { IconDotsVertical, IconMinus, IconPlus, IconTrash } from '@tabler/icons';
import { FC } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { TransactionModalInnerProps } from '../modals/TransactionModal';
import { showNotification } from '@mantine/notifications';

type UserAssetMenu = {
  name: string;
  friendlyName: string;
  origin: string | undefined;
  symbol: string | null;
};

export const UserAssetActionMenu: FC<{ asset: UserAssetMenu }> = ({ asset }) => {
  const context = useAPICommunication();
  const queryClient = useQueryClient();

  const userAssetsQuery = useQuery('userAssetsModal', async () => {
    const data = await context.userAssetsAPI.getAllUserAssets();
    return data;
  });

  const userAssetFound = userAssetsQuery === undefined ? undefined : 
    userAssetsQuery.data === undefined ? undefined :
    userAssetsQuery.data.filter((item) => item.asset.name === asset.name && item.description === asset.origin);

  const currentOriginValue = userAssetFound === undefined ? 0 
    : userAssetFound.length > 0 ? userAssetFound[0].originValue : 0;
    
  const openAddModal = () =>
    openContextModal({
      modal: 'transactionModal',
      title: (
        <Text>
          Add value to{' '}
          <Text span fw={700} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
            {asset.friendlyName} {asset.origin ? ' - ' : ''} {asset.origin ? asset.origin : ''}
          </Text>{' '}
          asset
        </Text>
      ),
      innerProps: {
        assetName: asset.name,
        origin: asset.origin,
        onSubmit: async (values) => {
          try {
            await context.userAssetsAPI.patchUserAssets({
              patchUserAssetsDto: [
                {
                  assetName: values.assetName,
                  description: values.origin,
                  type: 'Update',
                  value: values.value as unknown as number
                }
              ]
            });
            showNotification({
              autoClose: 5000,
              message: 'Succesfully added value to asset',
              color: 'green'
            });
            try {
              queryClient.invalidateQueries('userAsset');
            } catch (e) {
              showNotification({
                autoClose: 5000,
                message: 'Failed to refetch assets',
                color: 'red'
              });
            };
            try {
              queryClient.invalidateQueries('walletTotalValue');
            } catch (e) {
              showNotification({
                autoClose: 5000,
                message: 'Failed to refetch wallet value',
                color: 'red'
              });
            }
          } catch (e) {
            showNotification({
              autoClose: 5000,
              message: 'Failed to add value to asset',
              color: 'red'
            });
          }
        }
      } as TransactionModalInnerProps
    });

  const openSubstractModal = () =>
    openContextModal({
      modal: 'transactionModal',
      title: (
        <Text>
          Substract value from{' '}
          <Text span fw={700} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
            {asset.friendlyName} {asset.origin ? ' - ' : ''} {asset.origin ? asset.origin : ''}{' '}
          </Text>{' '}
          asset
        </Text>
      ),
      innerProps: {
        assetName: asset.name,
        origin: asset.origin,
        onSubmit: async (values) => {
          console.log(currentOriginValue);
          if (values.value && currentOriginValue - values.value <= 0) {
            showNotification({
              autoClose: 5000,
              message: 'Cannot substract value greater than current',
              color: 'red'
            });
          }
          else {
            try {
              await context.userAssetsAPI.patchUserAssets({
                patchUserAssetsDto: [
                  {
                    assetName: values.assetName,
                    description: values.origin,
                    type: 'Update',
                    value: (-values.value!) as unknown as number
                  }
                ]
              });
              showNotification({
                autoClose: 5000,
                message: 'Succesfully substracted value from asset',
                color: 'green'
              });
              try {
                queryClient.invalidateQueries('userAsset');
              } catch (e) {
                showNotification({
                  autoClose: 5000,
                  message: 'Failed to refetch assets',
                  color: 'red'
                });
              };
              try {
                queryClient.invalidateQueries('walletTotalValue');
              } catch (e) {
                showNotification({
                  autoClose: 5000,
                  message: 'Failed to refetch wallet value',
                  color: 'red'
                });
              }
            } catch (e) {
              showNotification({
                autoClose: 5000,
                message: 'Failed to substract value from asset',
                color: 'red'
              });
            }

          }
          
        }
      } as TransactionModalInnerProps
    });

  const openRemoveModal = () =>
    openConfirmModal({
      title: 'Remove asset',
      children: (
        <>
          Do you want to remove{' '}
          <Text span fw={700}>
            {asset.friendlyName} {asset.origin ? ' - ' : ''} {asset.origin ? asset.origin : ''}
          </Text>
          {' asset?'}
          <Space h={'sm'} />
        </>
      ),
      centered: false,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        try {
          await context.userAssetsAPI.deleteUserAsset({
            assetName: asset.name,
            description: asset.origin
          });
          showNotification({
            autoClose: 5000,
            message: 'Succesfully removed asset',
            color: 'green'
          });
          try {
            queryClient.invalidateQueries('userAsset');
          } catch (e) {
            showNotification({
              autoClose: 5000,
              message: 'Failed to refetch assets',
              color: 'red'
            });
          };
          try {
            queryClient.invalidateQueries('walletTotalValue');
          } catch (e) {
            showNotification({
              autoClose: 5000,
              message: 'Failed to refetch wallet value',
              color: 'red'
            });
          }
        } catch (e) {
          showNotification({
            autoClose: 5000,
            message: 'Failed to remove asset',
            color: 'red'
          });
        }
      },
      confirmProps: {
        color: 'red'
      }
    });

  return (
    <>
      <Menu shadow="md" width={120}>
        <Menu.Target>
          <ActionIcon size="sm">
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconPlus size={16} />} onClick={openAddModal}>
            Add
          </Menu.Item>
          <Menu.Item icon={<IconMinus size={16} />} onClick={openSubstractModal}>
            Substract
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={16} />} onClick={openRemoveModal}>
            Remove
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
