import { Card, Text } from "@mantine/core";
import { LineChart } from "./LineChart";
  
export interface AssetChartBoxProps {
  name: string,
  data: number[],
  gradient: string,
}

export const AssetChartBox = ({ name, data, gradient }: AssetChartBoxProps) => {
  return (
    <Card
      withBorder
      radius="md"
      style={{
        height: 180,
        backgroundImage: gradient,
      }}
    >
      <div style={{display: "flex", flexDirection: "row"}}>
          <Text style={{ fontWeight: 600, flex: 1}} size="xl" color="white"> { name }</Text>
          <div style={{flex: 6, marginRight: 40}}><LineChart data={data}/></div>
      </div>
    </Card>
  );
}
  