import { createStyles, Flex, Text, SegmentedControl, Space } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]}`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "blue", to: "cyan" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

export interface CurrencySwitchProps {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const CurrencySwitch = ({ disabled, value, onChange}: CurrencySwitchProps) => {
  const { classes } = useStyles();

  return (
    <Flex align="center" justify="flex-start" direction="row" mt="sm">
      <Text size={14} weight={400}>
        Preferred currency
      </Text>
      <Space w="md"></Space>
      <SegmentedControl
        title="Preferred currency"
        radius="md"
        size="sm"
        data={[{ label: "EUR", value: "eur"}, {label: "PLN", value: "pln"}, {label: "USD", value: "usd"}]}
        disabled={disabled}
        value={value}
        onChange={onChange}
        classNames={classes}
      />
    </Flex>
  );
};
