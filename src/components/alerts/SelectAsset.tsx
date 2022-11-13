import {
  Button,
  createStyles,
  Modal,
  SegmentedControl,
  TextInput,
  Card,
  Group,
  Avatar,
  Select,
  Center,
  Text,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { forwardRef } from "react";

const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "PLN",
    value: "PLN",
  },

  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "EUR",
    value: "EUR",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "USD",
    value: "USD",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "GBP",
    value: "GBP",
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  value: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, value, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group >
      <Avatar src={image} />
      <div>
        <Text size="sm">{label}</Text>
      </div>
    </Group>
  </div>
));

export const SelectAsset = () => {
  return (
    <Select
      placeholder="Pick asset"
      itemComponent={SelectItem}
      data={data}
      size="sm"
      searchable
      styles={{
        input: {
          width: 150,
        },
      }}
      dropdownPosition="bottom"
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
};
