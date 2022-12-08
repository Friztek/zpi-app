import { Text, Button, Card, Space, Flex, useMantineTheme } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { numberToMoneyString } from '../../utils/utils-format';

interface AlertCardImageProps {
  id: number;
  assetShortcutFrom: string;
  assetShortcutTo: string;
  value: number;
  currentValue?: number;
}

export const AlertCard = ({ assetShortcutFrom, assetShortcutTo, value, currentValue, id }: AlertCardImageProps) => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  const context = useAPICommunication();
  return (
    <Card
      withBorder
      radius="md"
      style={{
        height: 110,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`,
        padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
        [theme.fn.largerThan('sm')]: {
          padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`
        },
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white
      }}>
      <Flex
        direction="row"
        justify="space-between"
        style={{
          width: '100%'
        }}>
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size="lg"
          style={{
            fontFamily: `Greycliff CF ${theme.fontFamily}`,
            fontWeight: 800,
            lineHeight: 1.3,
            fontSize: 27
          }}>
          {'1 ' + assetShortcutFrom + ' = ' + value + ' ' + assetShortcutTo}
        </Text>
        <Button style={{ background: 'none' }} compact aria-label="Delete alert">
          <IconX
            size={20}
            color={theme.colorScheme === 'dark' ? 'white' : 'grey'}
            onClick={() => {
              openConfirmModal({
                title: (
                  <div style={{ paddingBottom: 4 }}>
                    Remove alert:
                    <Text span fw={600} px={6}>
                      {'1 ' + assetShortcutFrom + ' = ' + value + ' ' + assetShortcutTo}
                    </Text>
                  </div>
                ),
                centered: false,
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onConfirm: async () => {
                  try {
                    await context.allertsApi.deleteAlert({ id });
                    showNotification({
                      autoClose: 5000,
                      message: 'Successfully deleted alert',
                      color: 'green'
                    });
                    try {
                      queryClient.invalidateQueries('getAllAllerts');
                    } catch (e) {
                      showNotification({
                        autoClose: 5000,
                        message: 'Failed to refetch alerts',
                        color: 'red'
                      });
                    }
                  } catch (e) {
                    showNotification({
                      autoClose: 5000,
                      message: 'Failed to delete alert',
                      color: 'red'
                    });
                  }
                },
                confirmProps: {
                  color: 'red'
                }
              });
            }}
          />
        </Button>
      </Flex>
      <Space h="xs"></Space>
      {currentValue && (
        <Text
          size="xs"
          style={{
            color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[5],
            opacity: 0.7,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
          {'Current value: ' + numberToMoneyString(currentValue, 2) + ' ' + assetShortcutTo}
        </Text>
      )}
    </Card>
  );
};
