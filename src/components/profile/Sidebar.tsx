import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import { TablerIcon, IconFingerprint, IconUser } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

interface Link {
  icon: TablerIcon;
  label: string;
  href: string;
}

const NavbarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        sx={{ width: 40, height: 40, marginBottom: 20 }}
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} size={20} />
      </UnstyledButton>
    </Tooltip>
  );
};

const links = [
  { icon: IconUser, label: "User details", href: "/profile/details" },
  { icon: IconFingerprint, label: "Security", href: "/profile/security" },
];

export const Sidebar = () => {
  const router = useRouter();

  const [active, setActive] = useState(
    links.filter((link) => router.asPath === link.href)[0]
  );

  const items = links.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link === active}
      onClick={() => changeTab(link)}
    />
  ));

  const changeTab = (link: Link) => {
    setActive(link);
    router.push(link.href);
  };

  return (
    <Navbar height={"calc(100% - 60px);"} width={{ base: 70 }} p="md">
      <Navbar.Section grow mt={10}>
        <Stack justify="center" spacing={0}>
          {items}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
