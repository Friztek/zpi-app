import { AppShell, Navbar, Header } from "@mantine/core";
import { FC, JSXElementConstructor, ReactElement, ReactNode } from "react";

export const LoggedUserLayout: FC<{
  children: ReactNode;
  sidebar: ReactElement<any, string | JSXElementConstructor<any>>;
}> = ({ children, sidebar }) => {
  return (
    <AppShell
      padding="md"
      navbar={sidebar}
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
