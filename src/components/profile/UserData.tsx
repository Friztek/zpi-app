import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Paper,
  Text,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { IconPencil, IconUser } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  input: {
    "&:disabled": {
      backgroundColor: theme.colorScheme === "dark" ? "white" : "black",
    },
  },
  container: {
    [theme.fn.largerThan("md")]: {
      maxWidth: "70%",
    },
  },
}));

export function UserData() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "Name",
      email: "email@email.com",
    },
  });

  const [isDisabled, setisDisabled] = useState(true);

  const changeIsDisabled = () => {
    console.log("changed");
    setisDisabled(!isDisabled);
  };

  return (
    <div style={{ margin: "auto", padding: 5 }} className={classes.container}>
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
            <IconPencil />
          </ActionIcon>
        </Group>

        <TextInput
          disabled={isDisabled}
          label="Name"
          placeholder="Name"
          className={classes.input}
          {...form.getInputProps("name")}
        />
        <TextInput
          disabled={isDisabled}
          mt="md"
          label="Email"
          placeholder="Email"
          className={classes.input}
          {...form.getInputProps("email")}
        />
        {!isDisabled && (
          <Group position="center" mt="xl">
            <Button variant="outline" onClick={() => form.setValues()}>
              Save
            </Button>
            <Button variant="outline" onClick={() => form.reset()}>
              Reset to initial
            </Button>
          </Group>
        )}
      </Paper>
    </div>
  );
}
