import { Center, Text } from '@mantine/core';

export interface FetchingErrorProps {
  h?: string | number;
}

export const FetchingError = ({ h }: FetchingErrorProps) => {
  return (
    <Center h={h}>
      <Text>We are sorry. An error has occured while fetching the data.</Text>
    </Center>
  );
};
