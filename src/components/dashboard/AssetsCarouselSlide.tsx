import { Carousel } from "@mantine/carousel";
import { sub } from "date-fns";
import { useQuery } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { dateToOffsetDate } from "../../utils/utils-format";
import { AssetChartBox } from "./AssetChartBox";

type AssetsCarouselSlideProps = {
  assetName: string;
  gradient: string;
};

export const AssetsCarouselSlide = ({ assetName, gradient }: AssetsCarouselSlideProps) => {
    console.log(assetName);
  const dateToday = new Date();
  const dateMonthAgo = sub(dateToday, { months: 1 });

  const context = useAPICommunication();

  const assetValues = useQuery("assetValues", async () => {
    const from = dateToOffsetDate(dateMonthAgo);
    const data = await context.assetValuesApi.searchAssetValuesHistory({ assetName: assetName, from: from });
    const values = data.map((assetValueDto) => assetValueDto.value);
    console.log("values", values, assetName);
    return values;
  });

  return (
    <Carousel.Slide>
      <AssetChartBox name={assetName.toUpperCase()} data={assetValues.data === undefined ? [] : assetValues.data} gradient={gradient} />
    </Carousel.Slide>
  );
};
