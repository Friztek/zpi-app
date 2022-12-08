import { Button, Flex, Select, Stack, Autocomplete, NumberInput, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { ContextModalProps } from '@mantine/modals';
import { isFinite, trim } from 'lodash';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { getPrecisionByCategory } from '../../utils/utils-format';

export type TransactionModalValues = {
  assetName: string;
  origin: string;
  value: number | null;
};

export type TransactionModalInnerProps = {
  assetName?: string;
  origin?: string;
  onSubmit: (values: TransactionModalValues) => Promise<void>;
};

export const TransactionModal = ({ context, id, innerProps }: ContextModalProps<TransactionModalInnerProps>) => {
  const [isLoading, toggleLoading] = useToggle([false, true] as const);
  const form = useForm<TransactionModalValues>({
    initialValues: {
      assetName: innerProps.assetName ?? '',
      origin: innerProps.origin ?? '',
      value: null
    },
    validate: {
      assetName: (value) => (trim(value).length > 0 ? null : 'Required'),
      origin: (value) => (trim(value).length > 0 ? null : 'Required'),
      value: (value: number | null) =>
        value == null ? 'Required' : value <= 0 ? 'Value must be ge greater than zero' : isFinite(value) ? null : 'Required'
    }
  });

  const apiContext = useAPICommunication();
  const assetsData = useQuery('assets', async () => {
    return await apiContext.assetsAPI.getAllAssets();
  });

  assetsData?.data?.sort((item1, item2) =>
    item1.friendlyName > item2.friendlyName ? 1 : item1.friendlyName === item2.friendlyName ? 0 : -1
  );

  const getPrecision = (assetName: string) => {
    const foundAsset = assetsData.data?.find((asset) => asset.name === assetName);
    if (foundAsset) {
      return getPrecisionByCategory(foundAsset.category);
    }
    return 2;
  };

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          toggleLoading();
          await innerProps.onSubmit(values);
          context.closeModal(id);
          toggleLoading();
        })}>
        <Stack pb={'lg'} spacing={'xs'}>
          <Select
            readOnly={innerProps.assetName !== undefined}
            withAsterisk
            label="Asset name"
            data={
              assetsData.data?.map((asset) => ({
                value: asset.name,
                label: asset.friendlyName
              })) ?? []
            }
            rightSection={assetsData.data === undefined || assetsData.isLoading ? <Loader size="xs" /> : undefined}
            {...form.getInputProps('assetName')}
          />
          <Autocomplete
            readOnly={innerProps.origin !== undefined}
            data={[]}
            label="Origin"
            withAsterisk
            {...form.getInputProps('origin')}
          />
          <NumberInput
            withAsterisk
            min={0}
            precision={getPrecision(form.values.assetName)}
            {...form.getInputProps('value')}
            label="Value"
          />
        </Stack>
        <Flex direction={'row'} justify="space-between" gap={'lg'}>
          <Button variant="default" onClick={() => context.closeModal(id)} fullWidth>
            Close
          </Button>
          <Button fullWidth type="submit" loading={isLoading} disabled={Object.values(form.errors).length > 0}>
            Save
          </Button>
        </Flex>
      </form>
    </>
  );
};
