import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  const [checked, seChecked] = useState(false);

  useEffect(() => {
    console.log("auth", isAuthenticated);
    if (!isAuthenticated) {
      router.push("/");
    }
    if (isAuthenticated) {
      seChecked(true);
    }
  }, []);

  if (!checked) {
    return null;
  }

  console.log(checked);
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
