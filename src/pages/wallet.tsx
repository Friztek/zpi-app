import React from "react";
import { Sidebar } from "../components/common/Sidebar";
import { Topbar } from "../components/landingPage/Topbar";
import { LoggedUserLayout } from "../components/layout/LoggedUserLayout";
import { AssetList } from "../components/wallet/AssetList";

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

const Home = () => {
  return (
    <LoggedUserLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <AssetList data={data} />
    </LoggedUserLayout>
  );
};

export default Home;
