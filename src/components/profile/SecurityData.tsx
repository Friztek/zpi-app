import { Button, Group, Paper, Text, createStyles, Space } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconTools } from '@tabler/icons';
import { useAPICommunication } from '../../contexts/APICommunicationContext';

const useStyles = createStyles((theme) => ({
  button: {
    width: 200,
    marginLeft: 10,
    [theme.fn.smallerThan('sm')]: {
      marginLeft: 0,
      marginTop: 10
    }
  },

  paper: {
    backgroundColor: theme.colorScheme === 'dark' ? '#350a084f' : '#ffeeed',
    border: 'none',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    }
  }
}));

export const SecurityData = () => {
  const { classes } = useStyles();
  const context = useAPICommunication();
  const changePassword = async () => {
    try {
      await context.userApi.resetUserPassword();
      showNotification({ message: 'Successfully sent request for password reset', color: 'green' });
    } catch {
      showNotification({ message: 'Error occured during sending the request for password reset', color: 'red' });
    }
  };

  return (
    <Paper withBorder p="md" shadow="md" radius="md">
      <Group
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Group>
          <IconTools stroke={1.5} size={20} />
          <Text size="xl">Security</Text>
        </Group>
      </Group>

      <Space h="lg"></Space>
      <Paper withBorder p="md" shadow="md" radius="md" className={classes.paper}>
        <Group>
          <Text align="center">
            In order to change your password click the button. You will receive an email with further instructions.
          </Text>
        </Group>

        <Button className={classes.button} variant="outline" color="red" onClick={() => changePassword()}>
          Reset password
        </Button>
      </Paper>
    </Paper>
  );
};
