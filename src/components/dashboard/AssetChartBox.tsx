import { Card, Text, Flex } from '@mantine/core';
import { numberToMoneyString } from '../../utils/utils-format';
import { LineChart } from './LineChart';

export interface AssetChartBoxProps {
  name: string;
  data: number[];
  gradient: string;
  value: number;
  userPreferenceCurrency: string;
}

export const AssetChartBox = ({ name, data, gradient, value, userPreferenceCurrency }: AssetChartBoxProps) => {
  return (
    <Card
      withBorder
      radius="md"
      style={{
        height: 180,
        backgroundImage: gradient
      }}>
      <Flex direction="column">
        <Flex direction="row" style={{ flex: 1 }} justify="center" align="baseline">
          <Text style={{ fontWeight: 600, flex: 1 }} size="xl" color="white">
            {name}
          </Text>
          <Text style={{ fontWeight: 400, flex: 1 }} size="md" color="white">
            {value === 0 ? '' : numberToMoneyString(value, 2)} {value === 0 ? '' : userPreferenceCurrency.toUpperCase()}
          </Text>
        </Flex>
        <div style={{ flex: 6, marginRight: 40 }}>
          <LineChart data={data} />
        </div>
      </Flex>
    </Card>
  );
};
