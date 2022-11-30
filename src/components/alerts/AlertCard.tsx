import { createStyles, Text, Button, Card, Space } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundPosition: 'center'
  },
  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 800,
    color: theme.white,
    lineHeight: 1.3,
    fontSize: 27
  },

  currentValue: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase'
  }
}));

interface AlertCardImageProps {
  id: number;
  assetShortcutFrom: string;
  assetShortcutTo: string;
  value: number;
  currentValue?: number;
  gradient: string;
}

export const AlertCard = ({ assetShortcutFrom, assetShortcutTo, value, currentValue, gradient, id }: AlertCardImageProps) => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();

  const context = useAPICommunication();
  return (
    <Card
      withBorder
      radius="md"
      style={{
        height: 110,
        width: '100%',
        backgroundImage: gradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Text className={classes.title} size="lg">
          {'1 ' + assetShortcutFrom + ' = ' + value + ' ' + assetShortcutTo}
        </Text>
        <Button style={{ backgroundColor: 'rgb(64 123 139)' }} compact>
          <IconX
            size={18}
            onClick={() => {
              openConfirmModal({
                title: (
                  <div style={{ paddingBottom: 4 }}>
                    Remove allert:
                    <Text span fw={600} px={6}>
                      {'1 ' + assetShortcutFrom + ' = ' + value + ' ' + assetShortcutTo}
                    </Text>
                  </div>
                ),
                centered: true,
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onConfirm: async () => {
                  await context.allertsApi.deleteAlert({ id });
                  queryClient.invalidateQueries('getAllAllerts');
                },
                confirmProps: {
                  color: 'red'
                }
              });
            }}
          />
        </Button>
      </div>
      <Space h="xs"></Space>
      {currentValue && (
        <Text className={classes.currentValue} size="xs">
          {'Current value: ' + currentValue}
        </Text>
      )}
    </Card>
  );
};
