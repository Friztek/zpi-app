import { useForm } from "@mantine/form";
import { Button, Group, Paper, Text, ActionIcon, createStyles, Switch } from "@mantine/core";
import { IconEdit, IconEditOff, IconTools } from "@tabler/icons";
import { useState } from "react";
import { CurrencySwitch } from "./CurrencySwitch";

const useStyles = createStyles((theme) => ({
  switch: {
    marginTop: 10,
  },
  label: {
    color: `${theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6]} !important`,
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

  const [alertsOnEmail, setAlertsOnEmail] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const changeIsDisabled = () => {
    console.log("changed");
    setIsDisabled(!isDisabled);
  };

  const saveForm = () => {
    console.log("Preferences saved: alertsOnEmail", alertsOnEmail);
    console.log("Preferences saved: weeklyReports", weeklyReports);
    setIsDisabled(!isDisabled);
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
          <Text size="xl">Preferences</Text>
        </Group>

        <ActionIcon
          onClick={() => {
            changeIsDisabled();
          }}
          size="sm"
        >
          {isDisabled ? <IconEdit /> : <IconEditOff />}
        </ActionIcon>
      </Group>
      <CurrencySwitch disabled={isDisabled} />
      <Switch
        disabled={isDisabled}
        classNames={classes}
        label="Do you want to recieve alerts on email?"
        checked={alertsOnEmail}
        onChange={(event) => setAlertsOnEmail(event.currentTarget.checked)}
        styles={{ label: { color: " !important" } }}
      />
      <Switch
        disabled={isDisabled}
        classNames={classes}
        label="Do you want to recieve weekly reports on email?"
        checked={weeklyReports}
        onChange={(event) => setWeeklyReports(event.currentTarget.checked)}
      />

      {!isDisabled && (
        <Group position="center" mt="xl">
          <Button variant="outline" onClick={() => saveForm()}>
            Save
          </Button>
        </Group>
      )}
    </Paper>
  );
}
