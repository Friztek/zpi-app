import React from "react";
import { Layout } from "../components/layout/Layout";
import { Sidebar } from "../components/profile/Sidebar";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";

const Home = () => {
  return (
    <Layout>
      <Sidebar />
      <h1>Profile</h1>
    </Layout>
  );
};

export default Home;
