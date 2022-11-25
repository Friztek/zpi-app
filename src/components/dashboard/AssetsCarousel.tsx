import { Carousel } from "@mantine/carousel";
import { AssetDto } from "../../client-typescript";
import { AssetsCarouselSlide } from "./AssetsCarouselSlide";

type AssetsCarouselProps = {
  assets: AssetDto[];
};

export const AssetsCarousel = ({ assets }: AssetsCarouselProps) => {
  const gradients = [
    "linear-gradient( 105deg, #007991 10%, #78FFD6 100%)",
    "linear-gradient( 105deg, #00B4DB 10%, #0083B0 100%)",
    "linear-gradient( 105deg, #00D2FF 10%, #928DAB 100%)",
    "linear-gradient( 105deg, #8E2DE2 10%, #4A00E0 100%)",
    "linear-gradient( 105deg, #654EA3 10%, #EAAfC8 100%)",
    "linear-gradient( 105deg, #8360C3 10%, #2EBF91 100%)",
  ];

  const slides = assets.map((asset, index) => (
    <AssetsCarouselSlide
      key={asset.name}
      assetName={asset.name}
      gradient={gradients[index % gradients.length]}
    ></AssetsCarouselSlide>
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
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
    >
      {slides}
    </Carousel>
  );
};
