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
import { IconPencil, IconTools } from "@tabler/icons";
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

export function UserPreferences() {
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

  const saveForm = () => {
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
            <IconTools stroke={1.5} size={20} />
            <Text size="xl">Security</Text>
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

        {!isDisabled && (
          <Group position="center" mt="xl">
            <Button variant="outline" onClick={() => saveForm()}>
              Save
            </Button>
          </Group>
        )}
      </Paper>
    </div>
  );
}
