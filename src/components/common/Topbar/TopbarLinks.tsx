import { useAuth0 } from "@auth0/auth0-react";
import { createStyles, Group } from "@mantine/core";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

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
}));

export const TopbarLinks: FC<{
  links: { link: string; label: string }[];
}> = ({ links }) => {
  const { classes, cx } = useStyles();
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  const [active, setActive] = useState(
    links.filter((link) => router.asPath === link.link)[0]
  );

  if (!isAuthenticated) return null;
  return (
    <Group sx={{ height: "100%" }} spacing={40}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.link}
          className={cx(classes.link, {
            [classes.linkActive]: active === link,
          })}
          onClick={() => {
            setActive(link);
          }}
        >
          {link.label}
        </a>
      ))}
    </Group>
  );
};
