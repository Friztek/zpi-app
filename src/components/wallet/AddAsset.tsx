import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  NativeSelect,
  Space,
  TextInput,
  createStyles,
} from "@mantine/core";
import { IconMoneybag, IconPlus, IconTrash } from "@tabler/icons";
import { ChangeEvent, useState } from "react";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === "dark" ? "white" : "black",
  },
}));

const assetTypes = [
  { value: "eur", label: "🇪🇺 EUR" },
  { value: "usd", label: "🇺🇸 USD" },
  { value: "cad", label: "🇨🇦 CAD" },
  { value: "gbp", label: "🇬🇧 GBP" },
  { value: "aud", label: "🇦🇺 AUD" },
];

export type UserAsset = {
  id: number;
  amount: undefined;
  assetType: string;
};

export function AddAsset() {
  const { classes, theme } = useStyles();
  const [formFields, setFormFields] = useState([
    {
      id: 0,
      amount: undefined,
      assetType: assetTypes[0].value,
    },
  ]);

  const handleChange = (
    id: number,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("element", event.target.value);
    const index = formFields.findIndex((element) => element.id === id);
    const newFormFields = [...formFields];
    const name = event.target.name == "" ? "assetType" : event.target.name;
    newFormFields[index][name] = event.target.value;
    setFormFields(newFormFields);
  };

  const addNewInput = () => {
    const nextId = formFields[formFields.length - 1].id + 1;
    const newFormField = {
      id: nextId,
      amount: undefined,
      assetType: assetTypes[0].value,
    };
    setFormFields([...formFields, newFormField]);
    console.log("New input added");
  };

  const removeInput = (id: number) => {
    const newFormFields = [
      ...formFields.filter((element) => element.id !== id),
    ];
    setFormFields(newFormFields);
    console.log("Input removed");
    console.log("ff", formFields);
    console.log("nff", newFormFields);
  };

  const updateUserAssets = () => {
    console.log("Update assets", formFields);
  };

  return (
    <Card
      withBorder
      radius="md"
      style={{
        padding: "1rem 1rem 1rem 1rem",
      }}
    >
      <Group position="apart">
        <Avatar
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          radius="xl"
        >
          <IconMoneybag color="white" stroke="1.8" size={20} />
        </Avatar>
        <Badge
          style={{
            marginRight: "2rem",
          }}
        >
          New asset
        </Badge>
      </Group>

      <Space h="md" />

      {formFields.map((input, index) => {
        return (
          <Group
            key={input.id}
            style={{
              display: "flex",
              marginBottom: 5,
              gap: "0px",
              alignItems: "stretch",
            }}
          >
            <TextInput
              style={{
                flex: 10,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
              type="number"
              placeholder="1000"
              name="amount"
              value={input.amount}
              label={index == 0 ? "Add new asset" : ""}
              onChange={(element) => handleChange(input.id, element)}
              rightSection={
                <NativeSelect
                  data={assetTypes}
                  value={input.assetType}
                  onChange={(element) => handleChange(input.id, element)}
                  radius={index != 0 ? 0 : "sm"}
                  styles={{
                    input: {
                      fontWeight: 500,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  }}
                />
              }
              rightSectionWidth={92}
            />
            <div style={{ flex: 1 }}>
              {index !== 0 && (
                <Avatar
                  color="gray"
                  style={{
                    height: "100%",
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    border: "1px solid #ced4da",
                    borderLeft: "none",
                  }}
                  radius={0}
                  size="md"
                >
                  <IconTrash
                    className={classes.icon}
                    stroke="1.2"
                    onClick={() => removeInput(input.id)}
                    size={19}
                  />
                </Avatar>
              )}
            </div>
          </Group>
        );
      })}
      <Group style={{ flexDirection: "column-reverse", margin: "0.5rem" }}>
        <Avatar
          color="gray"
          style={{ border: "1px solid #ced4da" }}
          radius={4}
          size="md"
        >
          <IconPlus
            className={classes.icon}
            stroke="1.2"
            onClick={addNewInput}
            size={20}
          />
        </Avatar>
      </Group>
      <Group
        style={{
          flexDirection: "column-reverse",
          marginTop: "1rem",
          border: "none",
        }}
      >
        <Button variant="outline" onClick={updateUserAssets}>
          Update assets
        </Button>
      </Group>
    </Card>
  );
}
