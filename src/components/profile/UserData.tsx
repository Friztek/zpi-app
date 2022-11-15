import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Paper, Text, ActionIcon, createStyles, Space } from "@mantine/core";
import { IconEdit, IconEditOff, IconUser } from "@tabler/icons";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeContext } from "@emotion/react";

const useStyles = createStyles((theme) => ({
  textDiv: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]}`,
    borderRadius: 4,
    padding: "1px 12px",
    height: 36,
    fontSize: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.white[0],
    marginBottom: 1,
  },
}));

export function UserData() {
  const { classes } = useStyles();

  const { user } = useAuth0();

  const form = useForm({
    initialValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const changeIsDisabled = () => {
    console.log("changed");
    setIsDisabled(!isDisabled);
  };

  const saveForm = () => {
    setIsDisabled(!isDisabled);
    console.log("form saved");
  };

  return (
    <Paper withBorder p="md" shadow="md" radius="md">
      <Group
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Group>
          <IconUser stroke={1.5} size={20} />
          <Text size="xl">User details</Text>
        </Group>

        <ActionIcon
          onClick={() => {
            changeIsDisabled();
          }}
          size="sm"
        >
        </ActionIcon>
      </Group>

      {isDisabled ? (
        <div style={{ marginTop: 2 }}>
          <Text className={classes.label}>Name</Text>
          <Text className={classes.textDiv}>{form.values.name}</Text>
        </div>
      ) : (
        <TextInput disabled={isDisabled} label="Name" placeholder="Name" {...form.getInputProps("name")} />
      )}
      <Space h="md" />
      {isDisabled ? (
        <div style={{ marginTop: 2 }}>
          <Text className={classes.label}>Email</Text>
          <Text className={classes.textDiv}>{form.values.email}</Text>
        </div>
      ) : (
        <TextInput disabled={isDisabled} label="Email" placeholder="Email" {...form.getInputProps("email")} />
      )}

      {!isDisabled && (
        <Group position="center" mt="xl">
          <Button variant="outline" onClick={() => saveForm()}>
            Save
          </Button>
          <Button variant="outline" onClick={() => form.reset()}>
            Reset to initial
          </Button>
        </Group>
      )}
    </Paper>
  );
}
