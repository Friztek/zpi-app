import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Paper,
  Text,
  ActionIcon,
  createStyles,
  Stack,
  Space,
} from "@mantine/core";
import { IconPencil, IconTools } from "@tabler/icons";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "./Container";

const useStyles = createStyles((theme) => ({
  input: {
    "&:disabled": {
      backgroundColor: theme.colorScheme === "dark" ? "white" : "black",
    },
  },
  // textDiv: {
  //   border: "1px solid #e8ecf0",
  //   borderRadius: 4,
  //   height: 36,
  //   display: "flex",
  //   alignItems: "center",
  // },
  container: {
    [theme.fn.largerThan("md")]: {
      maxWidth: "80%",
    },
  },

  textGroup: {
    [theme.fn.largerThan("lg")]: {
      flex: 5,
    },
  },

  button: {
    width: 200,
    [theme.fn.largerThan("lg")]: {
      flex: 1,
      alignSelf: "flex-end",
    },
  },

  paper: {
    backgroundColor: "#ffeeed",
    border: "none",
    display: "flex",
    alignContent: "center",
    alignItems: "cetner",
    [theme.fn.largerThan("lg")]: {
      flexDirection: "row",
    },
    [theme.fn.smallerThan("lg")]: {
      flexDirection: "column",
    },
  },
}));

export const SecurityData = () => {
  const { classes, theme } = useStyles();

  const { user } = useAuth0();

  const { isAuthenticated } = useAuth0();

  const changePassword = () => {
    console.log("change password");
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
        </Group>

        <Space h="lg"></Space>
        <Paper
          withBorder
          p="md"
          shadow="md"
          radius="md"
          className={classes.paper}
        >
          <Group className={classes.textGroup}>
            <Text align="center">
              In order to change your password click the button. You will
              recieve an email with further instructions.
            </Text>
          </Group>

          <Button
            className={classes.button}
            variant="outline"
            color="red"
            onClick={() => changePassword()}
          >
            Change password
          </Button>
        </Paper>
      </Paper>
    </div>
  );
};
