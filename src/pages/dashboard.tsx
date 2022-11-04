import React from "react";
import { Layout } from "../components/layout/Layout";
import { AreaChart } from "../components/dashboard/AreaChart";
import { BrushChart } from "../components/dashboard/BrushChart";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const data = [
    [1666224000000,31.34],
    [1666310400000,31.18],
    [1666396800000,31.05],
    [1666483200000,31.00],
    [1666569600000,30.95],
    [1666656000000,31.24],
    [1666742400000,31.29],
    [1666828800000,31.85],
    [1666915200000,31.86],
    [1667001600000,32.28],
    [1667088000000,32.10],
    [1667174400000,32.65],
    [1667260800000,32.21],
    [1667347200000,32.35],
    [1667433600000,32.44],
    [1667520000000,30.95],
];


const Dashboard = () => {
  return (
    <Layout>
        <AreaChart data={data}/>
        <BrushChart data={data}/>
    </Layout>
  );
};


export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <p>Redirecting to the login page...</p>,
  });
