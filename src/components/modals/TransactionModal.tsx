import { Text, Button, Flex, TextInput, Select, Stack, Autocomplete, NumberInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { ContextModalProps } from "@mantine/modals";
import { isFinite, trim } from "lodash";
import { useQuery } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";

export type TransactionModalValues = {
  assetName: string;
  origin: string;
  value: number | null;
};

export type TransactionModalInnerProps = {
  onSubmit: (values: TransactionModalValues) => Promise<void>;
};

export const TransactionModal = ({ context, id, innerProps }: ContextModalProps<TransactionModalInnerProps>) => {
  const [isLoading, toggleLoading] = useToggle([false, true] as const);
  const form = useForm<TransactionModalValues>({
    initialValues: {
      assetName: "",
      origin: "",
      value: null,
    },
    validate: {
      assetName: (value) => (trim(value).length > 0 ? null : "Required"),
      origin: (value) => (trim(value).length > 0 ? null : "Required"),
      value: (value: number | null) => (isFinite(value) ? null : "Required"),
    },
  });

  const apiContext = useAPICommunication();
  const assetsData = useQuery("assets", async () => {
    return await apiContext.assetsAPI.getAllAssets();
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          toggleLoading();
          await innerProps.onSubmit(values);
          context.closeModal(id);
          toggleLoading();
        })}
      >
        <Stack pb={"lg"} spacing={"xs"}>
          <Select
            withAsterisk
            label="Asset name"
            data={assetsData.data?.map((asset) => ({
              value: asset.name,
              label: asset.friendlyName,
            }))}
            rightSection={assetsData.data === undefined || assetsData.isLoading ? <Loader size="xs" /> : undefined}
            {...form.getInputProps("assetName")}
          />
          <Autocomplete data={[]} label="Origin" withAsterisk {...form.getInputProps("origin")} />
          <NumberInput withAsterisk {...form.getInputProps("value")} label="Value" />
        </Stack>
        <Flex direction={"row"} justify="space-between" gap={"lg"}>
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
