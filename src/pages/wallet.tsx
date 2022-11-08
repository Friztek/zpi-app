import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { AddAsset } from "../components/wallet/AddAsset";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";
import { createStyles } from "@mantine/core";
import { useQuery, useQueryClient } from "react-query";
import { AssetDto, AssetsApi, Configuration } from "../client-typescript";
import { useAPICommunication } from "../contexts/APICommunicationContext";

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
    padding: "0.5rem",
    gap: "3rem",
    display: "flex",
    justifyContent: "center",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
    [theme.fn.largerThan("sm")]: {
      padding: "2rem 4rem",
      gap: "3rem",
    },
  },
  flexRowTablet: {
    flex: 2,
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
    flex: 3,
    justifySelf: "start",
    marginBottom: "2rem",
    [theme.fn.smallerThan("md")]: {
      [theme.fn.largerThan("sm")]: {
        marginBottom: "0rem",
      },
    },
  },
}));

const Wallet = () => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const userAssetQuery = useQuery("userAsset", async () => {
    return await context.userAssetsAPI.getAllUserAssets();
  });

  const assetQuery = useQuery("asset", async () => {
    return await context.assetsAPI.getAllAssets();
  });

  const userPreferenceQuery = useQuery("userPreference", async () => {
    return await context.userPreferenceAPI.getUserPreferences();
  });

  if (assetQuery.isLoading || userAssetQuery.isLoading || userPreferenceQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <div className={classes.content}>
        <div className={classes.flexRowTablet}>
          <div className={classes.removeMarginTablet}>
            <WalletValue data={values} />
          </div>
          <div style={{ flex: 3, justifySelf: "end" }}>
            <AddAsset assets={assetQuery.data!} />
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <UserAssetList data={userAssetQuery.data!} userPreferenceCurrencySymbol={"zł"} />
        </div>
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Wallet, {
  onRedirecting: () => <p>Redirecting to the login page...</p>,
});
