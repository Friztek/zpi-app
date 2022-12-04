import { Button } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { AddAlertModalInnerProps } from './AddAlertModal';

export const AddAlertButton = () => {
  const context = useAPICommunication();
  const quueryClient = useQueryClient();

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
              await context.allertsApi.addNewAllert({
                addAlertDto: { currency: values.currency, originAssetName: values.originAsset, value: values.value as number }
              });
              quueryClient.invalidateQueries('getAllAllerts');
            }
          } as AddAlertModalInnerProps
        })
      }>
      Add alert
    </Button>
  );
};
