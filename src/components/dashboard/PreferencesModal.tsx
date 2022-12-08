import { Button, createStyles, Switch, Modal, Flex, Stack } from '@mantine/core';
import { useState } from 'react';
import { CurrencySwitch } from '../profile/CurrencySwitch';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UpdateUserPreferencesRequest, UserPreferencesDto } from '../../client-typescript';
import { useToggle } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  switch: {
    marginTop: 10
  },
  label: {
    color: `${theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6]} !important`
  }
}));

export const PreferencesModal = () => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const [userPreferences, setUserPreferences] = useState<UserPreferencesDto>();
  const [opened, setOpened] = useState<boolean>(false);
  const [isLoading, toogleLoading] = useToggle([false, true]);

  const userPreferencesQuery = useQuery('userPreferences', async () => {
    const data = await context.userPreferenceAPI.getUserPreferences();
    setUserPreferences(data);
    setOpened(data.isDefault);
    return data;
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (patchUserPreferencesDto: UpdateUserPreferencesRequest) => {
      return await context.userPreferenceAPI.updateUserPreferences(patchUserPreferencesDto);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userPreferences');
      }
    }
  );

  const saveForm = async (command: UserPreferencesDto) => {
    await mutation.mutateAsync({ updateUserPreferencesDto: command });
    setOpened(false);
    toogleLoading();
  };

  if (!userPreferences) return null;
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        saveForm(userPreferencesQuery.data!);
        setOpened(false);
      }}
      title="Set preferences">
      <Stack spacing={2}>
        <CurrencySwitch
          value={userPreferences.preferenceCurrency}
          onChange={(value: string) => setUserPreferences((prev) => ({ ...prev!, preferenceCurrency: value }))}
          disabled={false}
        />
        <Switch
          classNames={classes}
          label="Do you want to receive alerts on email?"
          checked={userPreferences.alertsOnEmail}
          onChange={(event) => setUserPreferences((prev) => ({ ...prev!, alertsOnEmail: event.target.checked }))}
          styles={{ label: { color: ' !important' } }}
        />
        <Switch
          classNames={classes}
          label="Do you want to receive weekly reports on email?"
          checked={userPreferences.weeklyReports}
          onChange={(event) => {
            setUserPreferences((prev) => ({ ...prev!, weeklyReports: event.target.checked }));
          }}
        />
      </Stack>

      <Flex justify={'space-between'} direction="row" mt="xl">
        <Button variant="default" onClick={() => saveForm(userPreferencesQuery.data!)}>
          Keep defaults
        </Button>
        <Button variant="filled" onClick={() => saveForm(userPreferences)} loading={isLoading}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
};
