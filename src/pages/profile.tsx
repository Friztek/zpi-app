import { createStyles, Space, Title } from "@mantine/core";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { Sidebar } from "../components/profile/Sidebar";
import { UserData } from "../components/profile/UserData";
import { UserPreferences } from "../components/profile/UserPreferences";

const Home = () => {
  return (
    <Layout>
      <Sidebar />
      <Title
        align="center"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        style={{ marginTop: 10 }}
        order={1}
      >
        Profile
      </Title>
      <Space h="xl" />
      <UserData />
      <Space h="xl" />
      <UserPreferences />
    </Layout>
  );
};

export default Home;
