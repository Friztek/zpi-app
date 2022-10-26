import { useAuth0 } from "@auth0/auth0-react";
import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { Topbar } from "../common/Topbar";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/wallet",
    label: "Wallet",
  },
  {
    href: "/alerts",
    label: "Alerts",
  },
];

export const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  return (
    <AppShell
      padding={0}
      navbar={<Topbar isUserLoggedIn={isAuthenticated} links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <div>{children}</div>
    </AppShell>
  );
};
