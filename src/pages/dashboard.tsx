import React from "react";
import { Layout } from "../components/layout/Layout";
import { BrushChart } from "../components/dashboard/BrushChart";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { AssetsCarousel } from "../components/dashboard/AssetsCarousel";
import { Center, createStyles, Grid, Loader, Paper, Space } from "@mantine/core";
import { WalletStats } from "../components/dashboard/WalletStats";
import { HistoryTable } from "../components/dashboard/HistoryTable";
import { useAPICommunication } from "../contexts/APICommunicationContext";
import { useQuery } from "react-query";

const useStyles = createStyles((theme) => ({
  content: {
    padding: 10,
  },

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
}));

const Dashboard = () => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const walletHistoryData = useQuery("walletHistory", async () => {
    const data = await context.walletApi.apiWalletGet();
    data.sort((data1, data2) => data1.dateStamp.getTime() - data2.dateStamp.getTime());
    return data;
  });

  const assetsData = useQuery("assets", async () => {
    return await context.assetsAPI.getAllAssets();
  });

  const userPreferenceQuery = useQuery("userPreferenceDashboard", async () => {
    return await context.userPreferenceAPI.getUserPreferences();
  });

  if (walletHistoryData.data === undefined || userPreferenceQuery.data === undefined || assetsData.data === undefined) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  const walletData = walletHistoryData.data.map((row) => [row.dateStamp.getTime(), row.value]);

  return (
    <Layout>
      <div className={classes.content}>
        <Grid>
          <Grid.Col md={9}>
            <BrushChart data={walletData} />
          </Grid.Col>
          <Grid.Col md={3}>
            <WalletStats userPreferenceCurrency={userPreferenceQuery.data.preferenceCurrency.toUpperCase()} />
          </Grid.Col>
        </Grid>
        <Space h="md" />
        <div style={{ paddingBottom: "1rem" }}>
          <AssetsCarousel assets={assetsData.data}/>
        </div>
        <Space h="md" />
        <Grid>
          <Grid.Col md={4}>{/* <AddAsset /> */}</Grid.Col>
          <Grid.Col md={8}>
            <HistoryTable assets={assetsData.data}/>
          </Grid.Col>
        </Grid>
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting to the login page...</p>,
});
