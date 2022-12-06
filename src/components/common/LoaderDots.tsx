import { Center, Loader } from '@mantine/core';

export interface LoaderDotsProps {
  h?: string | number;
}

export const LoaderDots = ({ h }: LoaderDotsProps) => {
  return (
    <Center h={h}>
      <Loader size="xl" variant="dots" />
    </Center>
  );
};
