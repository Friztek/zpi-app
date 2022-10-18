import React from "react";
import { Layout } from "../components/layout/Layout";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";

const data = [
  {
    category: "Currency",
    symbol: "ZŁ",
    name: "Zloty",
  },
  {
    category: "Currency",
    symbol: "EUR",
    name: "Euro",
  },
  {
    category: "Currency",
    symbol: "GBP",
    name: "Great Britain Pound",
  },
];

const values = [
  {
    title: "Total value",
    value: "$13,456",
    diff: 34,
  },
];

const Home = () => {
  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <UserAssetList data={data} />
        </div>
        <div style={{ flex: 1 }}>
          <WalletValue data={values} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
