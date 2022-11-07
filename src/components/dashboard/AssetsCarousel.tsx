import { Carousel } from '@mantine/carousel';
import { AssetChartBox } from './AssetChartBox';

const data = [
  {
    name: "EUR",
    data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
    gradient: "linear-gradient( 105deg, #007991 10%, #78ffd6 100%)",
  },
  {
    name: "USD",
    data: [21, 20, 11, 2, 30, 44, 20, 12, 9, 1],
    gradient: "linear-gradient( 105deg, #00B4DB 10%, #0083B0 100%)",
  },
  {
    name: "GBP",
    data: [11, 10, 12, 20, 15, 18, 21, 10, 9, 12],
    gradient: "linear-gradient( 105deg, #00d2ff 10%, #928DAB 100%)",
  },
  {
    name: "PLN",
    data: [11, 20, 4, 2, 45, 44, 10, 12, 8, 1],
    gradient: "linear-gradient( 105deg, #8E2DE2 10%, #4A00E0 100%)",
  },
  {
    name: "CZE",
    data: [1,  41, 59, 25, 30, 41, 20, 12, 98, 1],
    gradient: "linear-gradient( 105deg, #654ea3 10%, #eaafc8 100%)",
    
  },
  {
    name: "STR",
    data: [30, 44, 20, 12, 9, 1, 21, 20, 11, 2],
    gradient: "linear-gradient( 105deg, #8360c3 10%, #2ebf91 100%)",
  },
];

export const AssetsCarousel = () => {
  const slides = data.map((item) => (
    <Carousel.Slide key={item.name}>
         <AssetChartBox name={ item.name } data={ item.data } gradient={ item.gradient }/>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="33.3333%"
      slideGap="lg"
      loop
      align="start"
      dragFree
      mx="auto"
      slidesToScroll={1}
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
    >
      {slides}
    </Carousel>
  );
}