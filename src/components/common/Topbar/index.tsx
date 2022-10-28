import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { ColorSchemeToggler } from "../ColorSchemeToggler";
import { TopbarUserButton } from "../TopbarUserButton";
import { TopbarLinks } from "./TopbarLinks";
import { TopbarDrawer } from "./TopbarDrawer";

const useStyles = createStyles((theme) => ({
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

export default function Topbar({ links }: HeaderSimpleProps) {
  const { loginWithRedirect } = useAuth0();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { user, isAuthenticated } = useAuth0();
  const { classes } = useStyles();

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          {isAuthenticated && (
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          )}
          <MantineLogo size={30} />

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <TopbarLinks links={links} />
          </Group>

          <Group>
            <Group>
              {isAuthenticated ? (
                <TopbarUserButton
                  user={{
                    image: user?.picture ?? "",
                    name: user?.name ?? "",
                  }}
                />
              ) : (
                <Button variant="default" onClick={loginWithRedirect}>
                  Log in
                </Button>
              )}
            </Group>
            <div className={classes.hiddenMobile}>
              <ColorSchemeToggler />
            </div>
          </Group>
        </Group>
      </Header>
      <TopbarDrawer isOpen={drawerOpened} links={links} onClose={closeDrawer} />
    </Box>
  );
}
