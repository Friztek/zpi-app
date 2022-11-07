import React from "react";
import dynamic from "next/dynamic";
import {  } from "@mantine/core";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const LineChart = ({ data }: {data: number[]}) => {
  // TODO: get colorScheme from localStorage
  const colorScheme = "dark";

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const state = {
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        height: 40,
        type: "line" as const,
        group: "sparks" as const,
        sparkline: {
          enabled: true,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#FFFFFF"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 10,
          bottom: 10,
          left: 15,
          right: 10,
        },
      },
      tooltip: {
        theme: "dark" as const,
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => {
              return "";
            },
          },
        },
      },
    },
  };

  return (
    <div id="chart">
      {typeof window !== "undefined" && (
        <div id="chart-timeline">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            // width={340}
            height={150}
            // sx={(theme) => ({
            //   [theme.fn.largerThan('md')]: { height: 70 },
            // })}
          />
        </div>
      )}
    </div>
  );
};
