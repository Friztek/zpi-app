import React from "react";
import dynamic from "next/dynamic";
import { gradient } from "./utils";
import { useMantineTheme } from "@mantine/core";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartData {
  data: number[][];
}

export const BrushChart = ({ data }: ChartData) => {
    const theme = useMantineTheme();
    
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
        id: "chart2",
        type: "line" as const,
        height: 230,
        toolbar: {
          autoSelected: "pan" as const,
          show: false,
        },
      },
      colors: ["#3eadcf"],
      background: '#fff',
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime" as const,
      },
    },

    seriesLine: [
      {
        data: data,
      },
    ],
    optionsLine: {
      chart: {
        id: "chart1",
        height: 130,
        type: "area" as const,
        brush: {
          target: "chart2",
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: firstDay.getTime(),
            max: lastDay.getTime(),
          },
        },
      },
      colors: ["#008FFB"],
      fill: {
        type: "gradient",
        gradient: gradient,
      },
      xaxis: {
        type: "datetime" as const,
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 2,
      },
    },
  };

  return (
    <div id="wrapper">
      <div id="chart-line2">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={230}
        />
      </div>
      <div id="chart-line">
        <ReactApexChart
          options={state.optionsLine}
          series={state.seriesLine}
          type="area"
          height={130}
        />
      </div>
    </div>
  );
};
