import { AppShell, Navbar, Header } from "@mantine/core";
import { FC, JSXElementConstructor, ReactElement, ReactNode } from "react";

export const LoggedUserLayout: FC<{
  children: ReactNode;
  sidebar: ReactElement<any, string | JSXElementConstructor<any>>;
  topbar: ReactElement<any, string | JSXElementConstructor<any>>;
}> = ({ children, sidebar, topbar }) => {
  return (
    <AppShell
      padding="md"
      navbar={sidebar}
      header={topbar}
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
