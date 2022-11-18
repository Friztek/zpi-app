import { ActionIcon, Menu, Text, Space, NumberInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconDotsVertical, IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { FC } from "react";
import { AssetDto } from "../../client-typescript";

export const UserAssetActionMenu: FC<{ asset: AssetDto }> = ({ asset }) => {
  const openAddModal = () =>
    openConfirmModal({
      title: (
        <>
          Add value to{" "}
          <Text span fw={600}>
            {asset.friendlyName}
          </Text>
          {" asset:"}
          <Space h={"sm"} />
          <NumberInput
            hideControls
            precision={8}
            styles={{
              input: {
                width: 300,
                textAlign: "center",
                fontWeight: 400,
                lineHeight: 1.3,
                fontSize: 18,
              },
            }}
          />
        </>
      ),
      centered: true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => console.log("Confirmed"),
      confirmProps: {
        color: "green",
      },
    });

  const openSubstractModal = () =>
    openConfirmModal({
      title: (
        <>
          Subsrtact value from{" "}
          <Text span fw={600}>
            {asset.friendlyName}
          </Text>
          {" asset:"}
          <Space h={"sm"} />
          <NumberInput
            hideControls
            precision={8}
            styles={{
              input: {
                width: 300,
                textAlign: "center",
                fontWeight: 400,
                lineHeight: 1.3,
                fontSize: 18,
              },
            }}
          />
        </>
      ),
      centered: true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => console.log("Confirmed"),
      confirmProps: {
        color: "blue",
      },
    });

  const openRemoveModal = () =>
    openConfirmModal({
      title: (
        <>
          Do you want to remove{" "}
          <Text span fw={600}>
            {asset.friendlyName}
          </Text>
          {" asset?"}
          <Space h={"sm"} />
        </>
      ),
      centered: true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
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
