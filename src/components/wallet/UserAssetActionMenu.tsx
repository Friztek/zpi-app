import { ActionIcon, Group, Menu, Modal, Text, Title, Space } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconDotsVertical, IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { FC, useState } from "react";
import { AssetDto } from "../../client-typescript";

export const UserAssetActionMenu: FC<{ asset: AssetDto }> = ({ asset }) => {
  const openModal = () =>
    openConfirmModal({
      title: (
        <>
          Remove asset:{" "}
          <Text span fw={600}>
            {asset.friendlyName}
          </Text>{" "}
          ?
          <Space h={"sm"}/>
        </>
      ),
      centered: true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
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
          <Menu.Item icon={<IconPlus size={16} />}>Add</Menu.Item>
          <Menu.Item icon={<IconMinus size={16} />}>Subtract</Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={16} />} onClick={openModal}>
            Remove
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
