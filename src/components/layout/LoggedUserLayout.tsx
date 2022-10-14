import { AppShell, Navbar, Header } from "@mantine/core";
import { FC, JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Sidebar } from "../common/Sidebar";
import { Topbar } from "../common/Topbar";

export const LoggedUserLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={<Sidebar />}
      header={<Topbar />}
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
