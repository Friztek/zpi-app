import { ActionIcon, Menu, Text, Space } from "@mantine/core";
import { openConfirmModal, openContextModal } from "@mantine/modals";
import { IconDotsVertical, IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { FC } from "react";
import { useQueryClient } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { TransactionModalInnerProps } from "../modals/TransactionModal";

type UserAssetMenu = {
  name: string;
  friendlyName: string;
  origin: string | undefined;
  symbol: string | null;
};

export const UserAssetActionMenu: FC<{ asset: UserAssetMenu }> = ({ asset }) => {
  const context = useAPICommunication();
  const queryClient = useQueryClient();

  const openAddModal = () =>
    openContextModal({
      modal: "transactionModal",
      title: (
        <Text>
          Add value to{" "}
          <Text span fw={700} variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }}>
            {asset.friendlyName} {asset.origin ? " - " : ""} {asset.origin ? asset.origin : ""}
          </Text>{" "}
          asset
        </Text>
      ),
      innerProps: {
        assetName: asset.name,
        origin: asset.origin,
        onSubmit: async (values) => {
          await context.userAssetsAPI.patchUserAssets({
            patchUserAssetsDto: [
              {
                assetName: values.assetName,
                description: values.origin,
                type: "Update",
                value: values.value as unknown as number,
              },
            ],
          });
          queryClient.invalidateQueries("userAsset");
        },
      } as TransactionModalInnerProps,
    });

  const openSubstractModal = () =>
    openContextModal({
      modal: "transactionModal",
      title: (
        <Text>
          Substract value from{" "}
          <Text span fw={700} variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }}>
            {asset.friendlyName} {asset.origin ? " - " : ""} {asset.origin ? asset.origin : ""}{" "}
          </Text>{" "}
          asset
        </Text>
      ),
      innerProps: {
        assetName: asset.name,
        origin: asset.origin,
        onSubmit: async (values) => {
          await context.userAssetsAPI.patchUserAssets({
            patchUserAssetsDto: [
              {
                assetName: values.assetName,
                description: values.origin,
                type: "Update",
                value: (0 - values.value!) as unknown as number,
              },
            ],
          });
          queryClient.invalidateQueries("userAsset");
        },
      } as TransactionModalInnerProps,
    });

  const openRemoveModal = () =>
    openConfirmModal({
      title: "Remove asset",
      children: (
        <>
          Do you want to remove{" "}
          <Text span fw={700}>
            {asset.friendlyName} {asset.origin ? " - " : ""} {asset.origin ? asset.origin : ""}
          </Text>
          {" asset?"}
          <Space h={"sm"} />
        </>
      ),
      centered: false,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: async () => {
        await context.userAssetsAPI.deleteUserAsset({
          assetName: asset.name,
          description: asset.origin,
        });
        queryClient.invalidateQueries("userAsset");
      },
      confirmProps: {
        color: "red",
      },
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
