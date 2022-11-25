import { Button, Group, Paper, Text, createStyles, Switch, Loader, Center, Modal } from "@mantine/core";
import { IconTools } from "@tabler/icons";
import { useState } from "react";
import { CurrencySwitch } from "../profile/CurrencySwitch";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UpdateUserPreferencesRequest, UserPreferencesDto } from "../../client-typescript";

const useStyles = createStyles((theme) => ({
  switch: {
    marginTop: 10,
  },
  label: {
    color: `${theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6]} !important`,
  },
}));

export const PreferencesModal = () => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const [userPreferences, setUserPreferences] = useState<UserPreferencesDto>();

  const [opened, setOpened] = useState<boolean>(true);

  const userPreferencesQuery = useQuery("userPreferences", async () => {
    const data = await context.userPreferenceAPI.getUserPreferences();
    setUserPreferences(data);
    return data;
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (patchUserPreferencesDto: UpdateUserPreferencesRequest) => {
      return context.userPreferenceAPI.updateUserPreferences(patchUserPreferencesDto);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userPreferences");
      },
    }
  );

  const saveForm = () => {
    mutation.mutate({ updateUserPreferencesDto: userPreferences });
    setOpened(true);
  };

  return (
    <Modal centered opened={opened} onClose={() => setOpened(false)}>
      <Paper withBorder p="md" shadow="md" radius="md" style={{ minHeight: 200 }}>
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
        </Group>
        {userPreferences === undefined ? (
          <Center h={120}>
            <Loader size="xl" variant="dots" />
          </Center>
        ) : (
          <div>
            <CurrencySwitch
              value={userPreferences.preferenceCurrency}
              onChange={(value: string) => setUserPreferences((prev) => ({ ...prev!, preferenceCurrency: value }))}
              disabled={false}
            />
            <Switch
              classNames={classes}
              label="Do you want to recieve alerts on email?"
              checked={userPreferences.alertsOnEmail}
              onChange={(event) => setUserPreferences((prev) => ({ ...prev!, alertsOnEmail: event.target.checked }))}
              styles={{ label: { color: " !important" } }}
            />
            <Switch
              classNames={classes}
              label="Do you want to recieve weekly reports on email?"
              checked={userPreferences.weeklyReports}
              onChange={(event) => {
                console.log("event", event);
                setUserPreferences((prev) => ({ ...prev!, weeklyReports: event.target.checked }));
              }}
            />

            <Group position="center" mt="xl">
              <Button variant="outline" onClick={() => saveForm()}>
                Save
              </Button>
            </Group>
          </div>
        )}
      </Paper>
    </Modal>
  );
}
