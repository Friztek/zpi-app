import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { TopbarUserButton } from "./TopbarUserButton";
import { useState } from "react";
import { ColorSchemeToggler } from "./ColorSchemeToggler";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "block",
    lineHeight: 1.5,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function Topbar({ links }: HeaderSimpleProps) {
  const { loginWithRedirect } = useAuth0();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { user } = useAuth0();
  const router = useRouter();
  const [active, setActive] = useState(
    links.filter((link) => router.asPath === link.link)[0]
  );
  const { classes, theme, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link,
      })}
      onClick={(event) => {
        event.preventDefault();
        router.push(link.link);
        setActive(link);
      }}
    >
      {link.label}
    </a>
  ));

  const UserOptions = ({
    isMobileView: isMobileView,
  }: {
    isMobileView: boolean;
  }) => {
    if (user) {
      return (
        <Group
          className={cx({ [classes.hiddenMobile]: isMobileView === false })}
        >
          <TopbarUserButton
            user={{
              image: user?.picture ?? "",
              name: user?.name ?? "",
            }}
          />
        </Group>
      );
    } else {
      return (
        <Group
          className={cx({ [classes.hiddenMobile]: isMobileView === false })}
        >
          <Button variant="default" onClick={loginWithRedirect}>
            Log in
          </Button>
        </Group>
      );
    }
  };

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
          <MantineLogo size={30} />

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Group sx={{ height: "100%" }} spacing={40}>
              {items}
            </Group>
          </Group>

          <Group>
            <UserOptions isMobileView={true} />
            <div className={classes.hiddenMobile}>
              <ColorSchemeToggler />
            </div>
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Group spacing={5}>{items}</Group>
          <Divider
            my="xl"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <ColorSchemeToggler />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
