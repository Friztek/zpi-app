<<<<<<< HEAD
import { createStyles, Space, Title } from "@mantine/core";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { Sidebar } from "../components/profile/Sidebar";
import { UserData } from "../components/profile/UserData";
import { UserPreferences } from "../components/profile/UserPreferences";
=======
import React from "react";
import { Layout } from "../components/layout/Layout";
import { Sidebar } from "../components/profile/Sidebar";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";
>>>>>>> 130b3d3f9c750112018d9802cd49e2354a82f7fc

const Home = () => {
  return (
    <Layout>
      <Sidebar />
<<<<<<< HEAD
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
=======
      <h1>Profile</h1>
>>>>>>> 130b3d3f9c750112018d9802cd49e2354a82f7fc
    </Layout>
  );
};

export default Home;
