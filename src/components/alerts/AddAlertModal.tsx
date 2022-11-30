import { Text, Button, Flex, Select, NumberInput, Loader, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { ContextModalProps } from '@mantine/modals';
import { isFinite, trim } from 'lodash';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';

export type AddAlertModalValues = {
  originAsset: string;
  currency: string;
  value: number | null;
};

export type AddAlertModalInnerProps = {
  onSubmit: (values: AddAlertModalValues) => Promise<void>;
};

export const AddAlertModal = ({ context, id, innerProps }: ContextModalProps<AddAlertModalInnerProps>) => {
  const [isLoading, toggleLoading] = useToggle([false, true] as const);
  const form = useForm<AddAlertModalValues>({
    initialValues: {
      originAsset: '',
      currency: '',
      value: null
    },
    validate: {
      originAsset: (value) => (trim(value).length > 0 ? null : 'Required'),
      currency: (value) => (trim(value).length > 0 ? null : 'Required'),
      value: (value: number | null) => (isFinite(value) ? null : 'Required')
    }
  });

  const apiContext = useAPICommunication();
  const assetsData = useQuery('assets', async () => {
    return await apiContext.assetsAPI.getAllAssets();
  });

  if (assetsData.isLoading || assetsData.data === undefined) return null;

  assetsData.data.sort();

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          toggleLoading();
          await innerProps.onSubmit(values);
          context.closeModal(id);
          toggleLoading();
        })}>
        <Flex pb={'xl'} direction="row" pt={'sm'}>
          <Select
            placeholder="Asset name"
            searchable
            data={assetsData.data?.map((asset) => ({
              value: asset.name,
              label: asset.friendlyName
            }))}
            miw={160}
            rightSection={assetsData.data === undefined || assetsData.isLoading ? <Loader size="xs" /> : undefined}
            {...form.getInputProps('originAsset')}
          />
          <Text size="lg" mx={'md'} py={3}>
            =
          </Text>
          <NumberInput
            placeholder="Value"
            {...form.getInputProps('value')}
            precision={2}
            step={0.01}
            stepHoldDelay={500}
            stepHoldInterval={100}
          />
          <Select
            miw={160}
            {...form.getInputProps('currency')}
            placeholder={'Target currency'}
            searchable
            data={
              assetsData.data
                ?.filter((asset) => asset.category === 'currency')
                .map((asset) => ({
                  value: asset.name,
                  label: asset.friendlyName
                })) ?? []
            }
            rightSection={assetsData.data === undefined || assetsData.isLoading ? <Loader size="xs" /> : undefined}
          />
        </Flex>
        <Group w="100%" position="right">
          <Button variant="default" onClick={() => context.closeModal(id)}>
            Close
          </Button>
          <Button type="submit" loading={isLoading} disabled={Object.values(form.errors).length > 0}>
            Save
          </Button>
        </Group>
      </form>
    </>
  );
};
