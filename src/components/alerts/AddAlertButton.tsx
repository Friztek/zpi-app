import { Button } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { AddAlertModalInnerProps } from './AddAlertModal';

export const AddAlertButton = () => {
  const context = useAPICommunication();
  const queryClient = useQueryClient();

  return (
    <Button
      variant="outline"
      leftIcon={<IconPlus size={14} />}
      onClick={() =>
        openContextModal({
          modal: 'alertModal',
          title: 'Add new alert',
          size: 'lg',
          innerProps: {
            onSubmit: async (values) => {
              try {
                await context.allertsApi.addNewAllert({
                  addAlertDto: { currency: values.currency, originAssetName: values.originAsset, value: values.value as number }
                });
                showNotification({
                  autoClose: 5000,
                  message: 'Successfully added new alert',
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
                  message: 'Failed to add new alert',
                  color: 'red'
                });
              }
            }
          } as AddAlertModalInnerProps
        })
      }>
      Add alert
    </Button>
  );
};
