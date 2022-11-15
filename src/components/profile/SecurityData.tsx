import { Button, Group, Paper, Text, createStyles, Space } from "@mantine/core";
import { IconTools } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  button: {
    width: 200,
    marginLeft: 10,
    [theme.fn.smallerThan("sm")]: {
      marginLeft: 0,
      marginTop: 10,
    },
  },

  paper: {
    backgroundColor: theme.colorScheme === "dark" ? "#350a084f" : "#ffeeed",
    border: "none",
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
}));

export const SecurityData = () => {
  const { classes } = useStyles();

  const changePassword = () => {
    console.log("change password");
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
        <Group>
          <Text align="center">
            In order to change your password click the button. You will recieve
            an email with further instructions.
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
  );
};
