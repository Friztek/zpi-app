import { Button, Group, Paper, Text, ActionIcon, createStyles, Switch, Loader, Center } from "@mantine/core";
import { IconEdit, IconEditOff, IconTools } from "@tabler/icons";
import { useState } from "react";
import { CurrencySwitch } from "./CurrencySwitch";
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

export function UserPreferences() {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const [userPreferences, setUserPreferences] = useState<UserPreferencesDto>();

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

  const [isDisabled, setIsDisabled] = useState(true);

  const changeIsDisabled = () => {
    if(isDisabled === false) {
      setUserPreferences(userPreferencesQuery.data);
    }
    setIsDisabled(!isDisabled);
  };

  const saveForm = () => {
    mutation.mutate({updateUserPreferencesDto: userPreferences});
    setIsDisabled(!isDisabled);
  };

  return (
    <Paper withBorder p="md" shadow="md" radius="md" style={{minHeight:200}}>
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
      {userPreferences === undefined ? (
        <Center> 
          <Loader size="xl" variant="dots" />
        </Center>
      ) : (
        <div>
          <CurrencySwitch
            value={userPreferences.preferenceCurrency}
            onChange={(value: string) => setUserPreferences((prev) => ({ ...prev!, preferenceCurrency: value }))}
            disabled={isDisabled}
          />
          <Switch
            disabled={isDisabled}
            classNames={classes}
            label="Do you want to recieve alerts on email?"
            checked={userPreferences.alertsOnEmail}
            onChange={(event) => setUserPreferences((prev) => ({ ...prev!, alertsOnEmail: event.target.checked }))}
            styles={{ label: { color: " !important" } }}
          />
          <Switch
            disabled={isDisabled}
            classNames={classes}
            label="Do you want to recieve weekly reports on email?"
            checked={userPreferences.weeklyReports}
            onChange={(event) => {
              console.log("event", event);
              setUserPreferences((prev) => ({ ...prev!, weeklyReports: event.target.checked }))}
            }
              />

          {!isDisabled && (
            <Group position="center" mt="xl">
              <Button variant="outline" onClick={() => saveForm()}>
                Save
              </Button>
            </Group>
          )}
        </div>
      )}
    </Paper>
  );
}
