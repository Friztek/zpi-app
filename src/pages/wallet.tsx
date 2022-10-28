import React from "react";
import { Layout } from "../components/layout/Layout";
import { AddAsset } from "../components/wallet/AddAsset";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";
import { createStyles } from "@mantine/core";

const data = [
  {
    category: "Currency",
    symbol: "ZŁ",
    name: "Zloty",
    value: 300,
    valuePrefered: 20,
  },
  {
    category: "Currency",
    symbol: "EUR",
    name: "Euro",
    value: 300,
    valuePrefered: 20,
  },
  {
    category: "Currency",
    symbol: "GBP",
    name: "Great Britain Pound",
    value: 300,
    valuePrefered: 20,
  },
];

const values = [
  {
    title: "Total value",
    value: "$13,456",
    diff: 34,
  },
];

const useStyles = createStyles((theme) => ({
  content: {
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
    padding: "0.5rem",
    gap: "3rem",
    [theme.fn.largerThan("sm")]: {
      padding: "2rem 4rem",
      gap: "3rem",
    },
  },
  flexRowTablet: {
    [theme.fn.smallerThan("md")]: {
      [theme.fn.largerThan("sm")]: {
        display: "flex",
        justifyContent: "center",
        width: "auto",
        gap: "2rem",
      },
    },
  },

  removeMarginTablet: {
    [theme.fn.smallerThan("md")]: {
      [theme.fn.largerThan("sm")]: {
        marginBottom: "0rem",
      },
    },
  },
}));

const Home = () => {
  const { classes, theme, cx } = useStyles();
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className={classes.content}
      >
        <div style={{ flex: 2 }} className={classes.flexRowTablet}>
          <div
            style={{ flex: 3, justifySelf: "start", marginBottom: "2rem" }}
            className={classes.removeMarginTablet}
          >
            <WalletValue data={values} />
          </div>
          <div style={{ flex: 3, justifySelf: "end" }}>
            <AddAsset />
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <UserAssetList data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
