import React from "react";
import { Layout } from "../components/layout/Layout";
import { Chart } from "../components/dashboard/Chart";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Dashboard = () => {
  return (
    <Layout>
     <Chart />
    </Layout>
  );
};


export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <p>Redirecting to the login page...</p>,
  });
