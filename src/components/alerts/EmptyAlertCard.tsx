import { Text, Card, useMantineTheme, Avatar, Space } from '@mantine/core';
import { IconBellRinging } from '@tabler/icons';

interface EmptyAlertCardImageProps {
  text: string;
}

export const EmptyAlertCard = ({ text }: EmptyAlertCardImageProps) => {
  const theme = useMantineTheme();

  return (
    <Card
      withBorder
      radius="md"
      style={{
        height: 110,
        width: '100%',
        backgroundColor: theme.colorScheme === 'dark' ? theme.black[0] : theme.white[0],
        position: 'relative'
      }}>
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Avatar size="xl" radius="md">
          <IconBellRinging color="gray" stroke="2" size={40} />
        </Avatar>
        <Space w="sm"></Space>
        <Text size="lg" color="gray">{text}</Text>
      </div>
    </Card>
  );
};
