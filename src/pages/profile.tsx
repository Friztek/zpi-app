import { Space, Title } from "@mantine/core";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { SecurityData } from "../components/profile/SecurityData";
import { Sidebar } from "../components/profile/Sidebar";
import { UserData } from "../components/profile/UserData";
import { UserPreferences } from "../components/profile/UserPreferences";

const Home = () => {
  return (
    <Layout>
      {/* <Sidebar /> */}
      <Space h="xl" />
      <UserData />
      <Space h="xl" />
      <UserPreferences />
      <Space h="xl" />
      <SecurityData />
    </Layout>
  );
};

export default Home;
