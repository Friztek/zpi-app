import React from "react";
import { Layout } from "../components/layout/Layout";
import { BrushChart } from "../components/dashboard/BrushChart";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { AssetsCarousel } from "../components/dashboard/AssetsCarousel";
import { createStyles } from "@mantine/core";
import { WalletValue } from "../components/wallet/WalletValue";
import { WalletStats } from "../components/dashboard/WalletStats";
import { HistoryTable } from "../components/dashboard/HistoryTable";
import { AddAsset } from "../components/wallet/AddAsset";

const walletData = [
  [1666224000000, 31.34],
  [1666310400000, 31.18],
  [1666396800000, 31.05],
  [1666483200000, 31.0],
  [1666569600000, 30.95],
  [1666656000000, 31.24],
  [1666742400000, 31.29],
  [1666828800000, 31.85],
  [1666915200000, 31.86],
  [1667001600000, 32.28],
  [1667088000000, 32.1],
  [1667174400000, 32.65],
  [1667260800000, 32.21],
  [1667347200000, 32.35],
  [1667433600000, 32.44],
  [1667520000000, 30.95],
];

const useStyles = createStyles((theme) => ({
  flex: {
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
    padding: "0.5rem",
    gap: "1rem",
    [theme.fn.largerThan("sm")]: {
      padding: "0.5rem 1rem 1.5rem 1rem",
      gap: "1rem",
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

  historyTable: {
    // marginLeft: 20,
    // [theme.fn.smallerThan("md")]: {
    //   marginLeft: 0
    // }
  },
}));

const values = [
  {
    title: "Total value",
    value: "$13,456",
    diff: 34,
  },
];

const walletStatsData = {
  total: "345,765",
  diff: 18,
  data: [
    {
      label: "Currency",
      count: "204,001",
      part: 59,
      color: "#136a8a",
    },
    {
      label: "Crypto Currency",
      count: "121,017",
      part: 35,
      color: "#267871",
    },
    {
      label: "Metals",
      count: "31,118",
      part: 6,
      color: "#00bf8f",
    },
  ],
};

const historyData = {
  data: [
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
    {
      name: "EUR",
      value: 10,
      date: "20/04/2021",
    },
  ],
};

const Dashboard = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className={classes.flex}
      >
        <div
          style={{ flex: 3, marginTop: "2rem" }}
          className={classes.flexRowTablet}
        >
          <div className={classes.removeMarginTablet}>
            <WalletStats
              total={walletStatsData.total}
              diff={walletStatsData.diff}
              data={walletStatsData.data}
            />
          </div>
        </div>
        <div style={{ flex: 7 }}>
          <BrushChart data={walletData} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className={classes.flex}
      >
        <div
          style={{ flex: 3 }}
          className={classes.flexRowTablet}
        >
          <div className={classes.removeMarginTablet}>
            <AddAsset />
          </div>
        </div>
        <div style={{ flex: 7 }} className={classes.historyTable}>
          <HistoryTable data={historyData.data} />
        </div>
      </div>
      <div style={{ paddingBottom: "1rem" }}>
        <AssetsCarousel />
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting to the login page...</p>,
});
