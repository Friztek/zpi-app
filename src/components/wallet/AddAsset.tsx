import {
  Avatar,
  Button,
  Group,
  Space,
  TextInput,
  Text,
  createStyles,
  Stack,
  Select,
  ActionIcon,
  Flex,
  Paper,
  Box,
  Loader,
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

export type AddAssetProps = {
  assets: AssetDto[];
};

export type AddTransactionModel = {
  id: number;
  value?: number;
  assetType?: string;
};

const initialValues: AddTransactionModel = {
  id: toNumber(uniqueId()),
  assetType: undefined,
  value: undefined,
};
export function AddAsset({ assets }: AddAssetProps) {
  const { classes, theme } = useStyles();

  const queryClient = useQueryClient();

  const [formFields, setFormFields] = useState<AddTransactionModel[]>([initialValues]);
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
                  <TextInput
                    radius={0}
                    style={{
                      flex: 1,
                    }}
                    type="number"
                    placeholder="1000"
                    name="amount"
                    value={input.value}
                    onChange={(event) => {
                      updateAssetValue(input.id, {
                        value: toNumber(event.target.value),
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
