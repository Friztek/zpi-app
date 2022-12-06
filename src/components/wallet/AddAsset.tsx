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
  Loader,
  NumberInput,
  Input,
  Center
} from '@mantine/core';
import { IconMoneybag, IconPlus, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { AssetDto, OperationType, PatchUserAssetsDto } from '../../client-typescript';
import { toNumber, uniqueId } from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { getPrecisionByCategory } from '../../utils/utils-format';

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
};

export type PrecisionModel = {
  id: number;
  precision: number;
};

const initialValues: AddTransactionModel = {
  id: toNumber(uniqueId()),
  assetName: undefined,
  value: undefined,
  description: undefined,
  precision: 2
};

export function AddAsset() {
  const { classes } = useStyles();

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

  const addNewInput = () => {
    setFormFields((values) => [
      ...values,
      { id: toNumber(uniqueId()), assetName: undefined, description: undefined, value: undefined, precision: 2 }
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
        <Center h={144}>
          <Loader size="xl" variant="dots" />
        </Center>
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
                    align={'center'}>
                    <Input
                      style={{ width: '100%' }}
                      styles={{
                        input: { borderBottom: 'none' }
                      }}
                      value={input.description}
                      radius={0}
                      onChange={(e) => {
                        updateAssetValue(input.id, {
                          description: e.target.value,
                          precision: input.precision
                        });
                      }}
                      placeholder="Asset origin (ex. cash, bank)"></Input>
                    <NumberInput
                      radius={0}
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
                          precision: input.precision
                        });
                      }}
                      rightSection={
                        <Select
                          placeholder="Asset name"
                          radius={0}
                          data={assetQuery.data!.map((asset) => ({
                            value: asset.name,
                            label: `${asset.friendlyName}`
                          }))}
                          value={input.assetName}
                          onChange={(value) => {
                            if (value === null) return;
                            updateAssetValue(input.id, {
                              assetName: value,
                              precision: getPrecision(value)
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
          <Flex align={'center'} justify="space-between" mt="lg">
            <ActionIcon variant="default" size={'lg'}>
              <IconPlus className={classes.icon} onClick={addNewInput} />
            </ActionIcon>
            <Button
              variant="filled"
              onClick={() => {
                mutation.mutate(
                  formFields.map((a) => ({
                    assetName: a.assetName!,
                    type: OperationType.Update,
                    value: a.value!,
                    description: a.description!
                  }))
                );
              }}>
              Apply transaction
            </Button>
          </Flex>
        </div>
      )}
    </Paper>
  );
}
