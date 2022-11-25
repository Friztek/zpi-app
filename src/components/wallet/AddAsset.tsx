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
} from "@mantine/core";
import { IconMoneybag, IconPlus, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { AssetDto, OperationType, PatchUserAssetsDto } from "../../client-typescript";
import { toNumber, uniqueId } from "lodash";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === "dark" ? "white" : "black",
  },
}));

const precisionMaping = [
  { assetType: "metal", precision: 6 },
  { assetType: "cryptoCurrency", precision: 8 },
  { assetType: "currency", precision: 2 },
];

export type AddAssetProps = {
  assets: AssetDto[];
};

export type AddTransactionModel = {
  id: number;
  value?: number;
  assetType?: string;
};

export type PrecisionModel = {
  id: number;
  precision: number;
};

const initialValues: AddTransactionModel = {
  id: toNumber(uniqueId()),
  assetType: undefined,
  value: undefined,
};

const initialPrecisionValues: PrecisionModel= {
  id: toNumber(uniqueId()),
  precision: 2,
};

export function AddAsset() {
  const { classes } = useStyles();

  const queryClient = useQueryClient();

  const [formFields, setFormFields] = useState<AddTransactionModel[]>([initialValues]);
  const [precision, setPrecision] = useState<PrecisionModel[]>([initialPrecisionValues]);
  const context = useAPICommunication();

  const assetQuery = useQuery("asset", async () => {
    return await context.assetsAPI.getAllAssets();
  });

  const mutation = useMutation(
    (patchUserAssetsDto: PatchUserAssetsDto[]) => {
      return context.userAssetsAPI.patchUserAssets({ patchUserAssetsDto });
    },
    {
      onSuccess: () => {
        setFormFields(() => [initialValues]);
        queryClient.invalidateQueries("userAsset");
      },
    }
  );

  const addNewInput = () => {
    setFormFields((values) => [...values, { assetType: undefined, id: toNumber(uniqueId()), value: undefined }]);
  };

  const removeInput = (id: number) => {
    setFormFields((values) => values.filter((val) => val.id !== id));
  };

  const updateAssetValue = (id: number, patch: Omit<AddTransactionModel, "id">) => {
    setFormFields((values) =>
      values.map((val) => {
        if (val.id === id) {
          Object.assign(val, patch);
        }
        return val;
      })
    );
  };

  const setPrecisionValue =  (id: number, assetType: string) => {
    const foundPrecision = precisionMaping.find((val) => { val.assetType === assetType });
    setPrecision((values) =>
      values.map((val) => {
        if (val.id === id) {
          val.precision = foundPrecision ? foundPrecision.precision : 2;
        }
        return val;
      })
    );
  };

  const getPrecisionValue =  (id: number) => {
    const foundPrecision = precision.find((val) => { val.id === id });
    console.log("get precision", foundPrecision ? foundPrecision.precision : 2);
    return foundPrecision ? foundPrecision.precision : 2;
  };


  return (
    <Paper withBorder radius="md" p={"md"}>
      <Group>
        <Avatar variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} radius="xl">
          <IconMoneybag color="white" stroke="1.8" size={20} />
        </Avatar>
        <Text fz="lg">Add new transaction</Text>
      </Group>

      {assetQuery.isLoading ? (
        <Loader size="xl" variant="dots" />
      ) : (
        <div>
          <Space h="md" />
          <Stack spacing={"sm"}>
            {formFields.map((input, index) => {
              return (
                <Flex align={"center"} gap={0} key={input.id}>
                  <NumberInput
                    radius={0}
                    style={{
                      flex: 1,
                    }}
                    type="number"
                    placeholder="1000"
                    precision={getPrecisionValue(input.id)}
                    name="amount"
                    value={input.value}
                    onChange={(value) => {
                      updateAssetValue(input.id, {
                        value,
                      });
                    }}
                    rightSection={
                      <Select
                        radius={0}
                        data={assetQuery.data!.map((asset) => ({
                          value: asset.name,
                          label: `${asset.friendlyName}`,
                        }))}
                        value={input.assetType}
                        onChange={(value) => {
                          if (value === null) return;
                          updateAssetValue(input.id, {
                            assetType: value,
                          });
                          setPrecisionValue(input.id, input.assetType!);
                        }}
                        styles={{
                          input: {
                            fontWeight: 500,
                          },
                        }}
                      />
                    }
                    rightSectionWidth={150}
                  />
                  {index !== 0 ? (
                    <Button
                      variant="default"
                      radius={0}
                      style={{ borderLeft: 0 }}
                      onClick={() => removeInput(input.id)}
                    >
                      <IconTrash className={classes.icon} stroke="1.2" size={19} />
                    </Button>
                  ) : (
                    <Box w={56}></Box>
                  )}
                </Flex>
              );
            })}
          </Stack>
          <Flex align={"center"} justify="space-between" mt="lg">
            <ActionIcon variant="default" size={"lg"}>
              <IconPlus className={classes.icon} onClick={addNewInput} />
            </ActionIcon>
            <Button
              variant="filled"
              onClick={() => {
                mutation.mutate(
                  formFields.map((a) => ({
                    assetName: a.assetType!,
                    type: OperationType.Update,
                    value: a.value!,
                  }))
                );
              }}
            >
              Apply transaction
            </Button>
          </Flex>
        </div>
      )}
    </Paper>
  );
}
