import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  NativeSelect,
  Space,
  TextInput,
} from "@mantine/core";
import { IconMoneybag, IconPlus } from "@tabler/icons";

const data = [
  { value: "eur", label: "🇪🇺 EUR" },
  { value: "usd", label: "🇺🇸 USD" },
  { value: "cad", label: "🇨🇦 CAD" },
  { value: "gbp", label: "🇬🇧 GBP" },
  { value: "aud", label: "🇦🇺 AUD" },
];

export function AddAsset() {
  const select = (
    <NativeSelect
      data={data}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  return (
    <Card withBorder radius="md">
      <Group position="apart">
        <Avatar color="blue" radius="xl">
          <IconMoneybag size={20} />
        </Avatar>
        <Badge>New asset</Badge>
      </Group>

      <Space h="md" />

      <TextInput
        type="number"
        placeholder="1000"
        label="Add new asset"
        rightSection={select}
        rightSectionWidth={92}
      />
      <Group style={{ flexDirection: "column-reverse", margin: "0.5rem" }}>
        <IconPlus size={20} />
      </Group>
      <Group style={{ flexDirection: "column-reverse", marginTop: "1rem" }}>
        <Button variant="outline">Update assets</Button>
      </Group>
    </Card>
  );
}
