import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { Button, Center, createStyles, Flex, Group, Paper, SimpleGrid, Space, Text } from "@mantine/core";
import { AlertCard } from "../components/alerts/AlertCard";
import { EmptyAlertCard } from "../components/alerts/EmptyAlertCard";
import { AlertStats } from "../components/alerts/AlertStats";
import { AddAlert } from "../components/alerts/AddAlert";

const useStyles = createStyles(() => ({
  content: {
    padding: "0.5rem",
    gap: "3rem",
  },
}));

const alert = {
  assetShortcutFrom: "EUR",
  assetShortcutTo: "PLN",
  value: 5,
  currentValue: 4.6782,
  gradient: "linear-gradient(105deg, #2C3E50 10%, #4CA1AF 100%)",
};

const statsData = {
  data: [
    {
      label: "Alerts for currencies",
      numberPending: 10,
      numberTriggered: 2,
    },
    {
      label: "Alerts for cryptocurrencies",
      numberPending: 10,
      numberTriggered: 2,
    },
    {
      label: "Alerts for metals",
      numberPending: 10,
      numberTriggered: 2,
    },
  ],
};

const Alerts = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <div className={classes.content}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 1240, cols: 1, spacing: "md" }]} style={{ marginTop: 10 }}>
          <div>
            <Flex justify="center" align="center" direction="column" style={{ width: "100%" }}>
              <AlertStats data={statsData.data} />
            </Flex>
          </div>
          <div>
            <Paper style={{ height: "100%" }} withBorder radius="md" p="sm">
              <Flex justify="center" align="center" direction="column" style={{ width: "100%" }}>
                <SimpleGrid cols={3} style={{ alignItems: "center", width: "100%", height: 50 }}>
                  <div></div>
                  <Center>
                    <Text>Pending alerts</Text>
                  </Center>
                  <Flex justify="end">
                    <AddAlert />
                  </Flex>
                </SimpleGrid>
                <AlertCard
                  assetShortcutFrom={alert.assetShortcutFrom}
                  assetShortcutTo={alert.assetShortcutTo}
                  value={alert.value}
                  currentValue={alert.currentValue}
                  gradient={alert.gradient}
                />
              </Flex>
            </Paper>
          </div>
          <div>
            <Paper style={{ height: "100%" }} withBorder radius="md" p="sm">
              <Flex justify="center" align="center" direction="column" style={{ width: "100%" }}>
                <Group style={{ height: 50 }}>
                  {" "}
                  <Text>Triggered alerts</Text>
                </Group>
                <EmptyAlertCard text="Your triggered alerts will be displayed here." />
              </Flex>
            </Paper>
          </div>
        </SimpleGrid>
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Alerts, {
  onRedirecting: () => <p>Redirecting to the login page...</p>,
});
