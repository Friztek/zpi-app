import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Paper,
  Text,
  ActionIcon,
  createStyles,
  Popover,
  Tooltip,
} from "@mantine/core";
import { IconInfoCircle, IconPencil, IconUser } from "@tabler/icons";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  input: {
    "&:disabled": {
      backgroundColor: theme.colorScheme === "dark" ? "white" : "black",
    },
  },
  container: {
    [theme.fn.largerThan("md")]: {
      maxWidth: "80%",
    },
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
            <Button variant="outline" onClick={() => saveForm()}>
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
