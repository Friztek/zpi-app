import { createStyles, Group, Space, Title } from "@mantine/core";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { SecurityData } from "../components/profile/SecurityData";
import { UserData } from "../components/profile/UserData";
import { UserPreferences } from "../components/profile/UserPreferences";

const useStyles = createStyles((theme) => ({
  content: {
    margin: "auto",
    padding: 5,
    [theme.fn.largerThan("md")]: {
      maxWidth: "75%",
    },
  },
}));

const Home = () => {
  const { classes } = useStyles();
  return (
    <Layout>
      <div className={classes.content}>
        <Space h="xl" />
        <UserData />
        <Space h="xl" />
        <UserPreferences />
        <Space h="xl" />
        <SecurityData />
      </div>
    </Layout>
  );
};

export default Home;
