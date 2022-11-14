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
}

export const CurrencySwitch = ({ disabled }: CurrencySwitchProps) => {
  const { classes } = useStyles();

  const changePreferedCurrency = (value: string) => {
    console.log("Prefered currency cahnged to value:", value);
  };
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
        data={["EUR", "PLN", "USD"]}
        disabled={disabled}
        onChange={(value: string) => changePreferedCurrency(value)}
        classNames={classes}
      />
    </Flex>
  );
};
