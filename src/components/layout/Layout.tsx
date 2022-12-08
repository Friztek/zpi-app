import { AppShell } from '@mantine/core';
import { FC, ReactNode } from 'react';
import Topbar from '../common/Topbar';

const links = [
  {
    link: '/dashboard',
    label: 'Dashboard'
  },
  {
    link: '/my-assets',
    label: 'Wallet'
  },
  {
    link: '/alerts',
    label: 'Alerts'
  }
];

export const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <AppShell
      padding={0}
      navbar={<Topbar links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          // maxHeight: '100vh'
        }
      })}>
      {children}
    </AppShell>
  );
};
