import { IconWallet } from "@tabler/icons";
import React from "react";
import { Sidebar } from "../components/common/Sidebar";
import { Topbar } from "../components/common/Topbar";
import { LoggedUserLayout } from "../components/layout/LoggedUserLayout";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";

const data = [
  {
    position: 6,
    mass: 12.011,
    symbol: "C",
    name: "Carbon",
  },
  {
    position: 7,
    mass: 14.007,
    symbol: "N",
    name: "Nitrogen",
  },
  {
    position: 39,
    mass: 88.906,
    symbol: "Y",
    name: "Yttrium",
  },
  {
    position: 56,
    mass: 137.33,
    symbol: "Ba",
    name: "Barium",
  },
  {
    position: 58,
    mass: 140.12,
    symbol: "Ce",
    name: "Cerium",
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
    <LoggedUserLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div style={{display: "flex", justifyContent: "center", gap: "1rem"}}>
        <div style={{flex: 1}}>
          <UserAssetList data={data} />
        </div>
        <div style={{flex: 1}}>
          <WalletValue data={values} />
        </div>
      </div>
    </LoggedUserLayout>
  );
};

export default Home;
