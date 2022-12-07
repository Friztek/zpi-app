import {
  Avatar,
  Button,
  Group,
  Space,
  Text,
  createStyles,
  Stack,
  Select,
  ActionIcon,
  Flex,
  Paper,
  Box,
  NumberInput,
  Input
} from '@mantine/core';
import { IconMoneybag, IconPlus, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { AssetDto, OperationType, PatchUserAssetsDto } from '../../client-typescript';
import { toNumber, uniqueId } from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { getMinValueByCategory, getPrecisionByCategory } from '../../utils/utils-format';
import { useToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { LoaderDots } from '../common/LoaderDots';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black'
  }
}));

export type AddAssetProps = {
  assets: AssetDto[];
};

export type AddTransactionModel = {
  id: number;
  value?: number;
  assetName?: string;
  description?: string;
  precision: number;
  min: number;
};

const initialValues: AddTransactionModel = {
  id: toNumber(uniqueId()),
  assetName: undefined,
  value: undefined,
  description: undefined,
  precision: 2,
  min: 0.01
};

export function AddAsset() {
  const { classes } = useStyles();

  const [isLoading, toggleLoading] = useToggle([false, true] as const);

  const context = useAPICommunication();
  const queryClient = useQueryClient();

  const [formFields, setFormFields] = useState<AddTransactionModel[]>([initialValues]);

  const assetQuery = useQuery('asset', async () => {
    return await context.assetsAPI.getAllAssets();
  });

  const getPrecision = (assetName: string) => {
    const foundAsset = assetQuery.data?.find((asset) => asset.name === assetName);
    if (foundAsset) {
      return getPrecisionByCategory(foundAsset.category);
    }
    return 2;
  };

  const getMin = (assetName: string) => {
    const foundAsset = assetQuery.data?.find((asset) => asset.name === assetName);
    if (foundAsset) {
      return getMinValueByCategory(foundAsset.category);
    }
    return 0.01;
  };

  const mutation = useMutation(
    (patchUserAssetsDto: PatchUserAssetsDto[]) => {
      return context.userAssetsAPI.patchUserAssets({ patchUserAssetsDto });
    },
    {
      onSuccess: () => {
        setFormFields(() => [initialValues]);
        queryClient.invalidateQueries('userAsset');
      }
    }
  );

  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkForm = () => {
    setErrorMessage('');
    formFields.forEach((field) => {
      if (field.assetName === undefined) {
        console.log(field.assetName);
        setErrorMessage('Asset name is required.');
        return;
      }
      if (field.description === undefined) {
        console.log(field.description);
        setErrorMessage("Asset's origin is required.");
        return;
      }
      if (field.value === undefined) {
        setErrorMessage("Asset's value is required.");
        return;
      }
    });
  };

  const addNewInput = () => {
    setFormFields((values) => [
      ...values,
      { id: toNumber(uniqueId()), assetName: undefined, description: undefined, value: undefined, precision: 2, min: 0.01 }
    ]);
  };

  const removeInput = (id: number) => {
    setFormFields((values) => values.filter((val) => val.id !== id));
  };

  const updateAssetValue = (id: number, patch: Omit<AddTransactionModel, 'id'>) => {
    setFormFields((values) =>
      values.map((val) => {
        if (val.id === id) {
          Object.assign(val, patch);
        }
        return val;
      })
    );
  };

  return (
    <Paper withBorder radius="md" p={'md'}>
      <Group>
        <Avatar variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} radius="xl">
          <IconMoneybag color="white" stroke="1.8" size={20} />
        </Avatar>
        <Text fz="lg">Add new transaction</Text>
      </Group>

      {assetQuery.isLoading ? (
        <LoaderDots h={144} />
      ) : (
        <div>
          <Space h="md" />
          <Stack spacing={'sm'}>
            {formFields.map((input, index) => {
              return (
                <Flex direction="row" key={input.id} align={'stretch'}>
                  <Flex
                    style={{
                      flex: 10
                    }}
                    direction="column"
                    align={'center'}
                    gap={0}>
                    <Input
                      style={{ width: '100%' }}
                      name="origin"
                      value={input.description}
                      onChange={(value: any) => {
                        if (value === null) return;
                        updateAssetValue(input.id, {
                          value: input.value,
                          description: value,
                          precision: input.precision,
                          min: input.min,
                          assetName: input.assetName,
                        });
                      }}
                      radius={0}
                      placeholder="Asset origin (ex. cash, bank)">
                    </Input>
                    <NumberInput
                      radius={0}
                      min={input.min}
                      style={{
                        flex: 1,
                        width: '100%'
                      }}
                      type="number"
                      placeholder="1000"
                      precision={input.precision}
                      name="amount"
                      value={input.value}
                      onChange={(value) => {
                        updateAssetValue(input.id, {
                          value: value,
                          precision: input.precision,
                          min: input.min
                        });
                      }}
                      rightSection={
                        <Select
                          placeholder="Asset name"
                          radius={0}
                          required={true}
                          data={assetQuery.data!.map((asset) => ({
                            value: asset.name,
                            label: `${asset.friendlyName}`
                          }))}
                          value={input.assetName}
                          onChange={(value) => {
                            if (value === null) return;
                            updateAssetValue(input.id, {
                              assetName: value,
                              precision: getPrecision(value),
                              min: getMin(value),
                              value: input.value,
                              description: input.description
                            });
                          }}
                          styles={{
                            input: {
                              fontWeight: 500
                            }
                          }}
                        />
                      }
                      rightSectionWidth={150}
                    />
                  </Flex>
                  {index !== 0 ? (
                    <Flex direction={'column'}>
                      <Button
                        variant="default"
                        radius={0}
                        style={{ border: 'none', background: 'none', height: '100%' }}
                        onClick={() => removeInput(input.id)}>
                        <IconTrash className={classes.icon} stroke="1.2" size={19} />
                      </Button>
                    </Flex>
                  ) : (
                    <Box w={56}></Box>
                  )}
                </Flex>
              );
            })}
          </Stack>
          <div>
            <Text color="red">{errorMessage}</Text>
          </div>
          <Flex align={'center'} justify="space-between" mt="lg">
            <ActionIcon variant="default" size={'lg'}>
              <IconPlus className={classes.icon} onClick={addNewInput} />
            </ActionIcon>
            <Button
              variant="filled"
              loading={isLoading}
              onClick={() => {
                checkForm();
                console.log(errorMessage);
                if (errorMessage === '') {
                  toggleLoading(true);
                  try {
                    mutation.mutate(
                      formFields.map((a) => ({
                        assetName: a.assetName!,
                        type: OperationType.Update,
                        value: a.value!,
                        description: a.description!
                      }))
                    );
                    showNotification({
                      autoClose: 5000,
                      message: 'Succesfully added new transaction',
                      color: "green"
                    });

                  }
                  catch (e) {
                    showNotification({
                      autoClose: 5000,
                      message: 'Failed to add new transaction',
                      color: "red"
                    });
                  }
                  toggleLoading(false);
                }
              }}>
              Apply transaction
            </Button>
          </Flex>
        </div>
      )}
    </Paper>
  );
}
