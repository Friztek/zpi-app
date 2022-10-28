import { Drawer, ScrollArea, Divider, createStyles } from "@mantine/core";
import React, { FC } from "react";
import { ColorSchemeToggler } from "../ColorSchemeToggler";
import { TopbarLinks } from "./TopbarLinks";

const useStyles = createStyles((theme) => ({
  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const TopbarDrawer: FC<{
  links: { link: string; label: string }[];
  onClose: () => void;
  isOpen: boolean;
}> = ({ links, onClose, isOpen }) => {
  const { classes, theme } = useStyles();
  
  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
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
        <TopbarLinks links={links} />
        <Divider
          my="xl"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />
        <ColorSchemeToggler />
      </ScrollArea>
    </Drawer>
  );
};
