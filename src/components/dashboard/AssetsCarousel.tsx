import { Carousel } from '@mantine/carousel';
import { useQuery } from 'react-query';
import { AssetDto } from '../../client-typescript';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { FetchingError } from '../common/FetchingError';
import { LoaderDots } from '../common/LoaderDots';
import { AssetsCarouselSlide } from './AssetsCarouselSlide';

type AssetsCarouselProps = {
  assets: AssetDto[];
  userPreferenceCurrency: string;
};

export const AssetsCarousel = ({ assets, userPreferenceCurrency }: AssetsCarouselProps) => {
  const gradients = [
    'linear-gradient( 105deg, #007991 10%, #78FFD6 100%)',
    'linear-gradient( 105deg, #00B4DB 10%, #0083B0 100%)',
    'linear-gradient( 105deg, #00D2FF 10%, #928DAB 100%)',
    'linear-gradient( 105deg, #8E2DE2 10%, #4A00E0 100%)',
    'linear-gradient( 105deg, #654EA3 10%, #EAAfC8 100%)',
    'linear-gradient( 105deg, #8360C3 10%, #2EBF91 100%)'
  ];

  const context = useAPICommunication();

  const userPreferedCurrencyExchangeRate = useQuery(['userPreferedCurrencyExchangeRate', userPreferenceCurrency], async () => {
    const dateToday = new Date();
    const data = await context.assetValuesApi.apiAssetValuesGet();
    return data;
  });

  if (userPreferedCurrencyExchangeRate.isError) {
    return <FetchingError h={'80vh'} />;
  }

  if (userPreferedCurrencyExchangeRate.data === undefined) {
    return <LoaderDots h={'80vh'}></LoaderDots>;
  }

  const preferedCurrencyValue = userPreferedCurrencyExchangeRate.data.find(
    (assetValueDto) => assetValueDto.assetIdentifier === userPreferenceCurrency
  );

  if (preferedCurrencyValue === undefined) {
    return <FetchingError h={'80vh'} />;
  }
  const slides = assets.map((asset, index) => (
    <AssetsCarouselSlide
      key={asset.name}
      assetName={asset.name}
      userPreferenceCurrency={userPreferenceCurrency}
      userPreferenceCurrencyExchangeRate={preferedCurrencyValue.value}
      gradient={gradients[index % gradients.length]}></AssetsCarouselSlide>
  ));

  return (
    <Carousel
      slideSize="33.3333%"
      slideGap="lg"
      loop
      align="start"
      dragFree
      slidesToScroll={1}
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 }
      ]}>
      {slides}
    </Carousel>
  );
};
