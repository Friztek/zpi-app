import React from "react";
import dynamic from "next/dynamic";
import { gradient, WalletData } from "./utils";
import { useViewportSize } from "@mantine/hooks";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


export const BrushChart = ({ data }: WalletData) => {
  // TODO: get colorScheme from localStorage and reload chart after changing scheme
  const colorScheme = "dark";

  const { height, width } = useViewportSize();

  const chartHeight = () => {
   return Math.max(350, height / 2.8 )
  };

  const foreColor = () => {
    if (colorScheme === "dark") {
      return "#FFFFFF";
    }
    return "#000000";
  };

  const borderColor = () => {
    if (colorScheme === "dark") {
      return "#222324";
    }
    return "#e8ebed";
  };

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
        foreColor: foreColor(),
        id: "chart2",
        type: "line" as const,
        height: 110,
        colors: ["#3eadcf"],
        toolbar: {
          autoSelected: "pan" as const,
          show: false,
        },
      },
      colors: ["#3eadcf"],
      background: "transparent",
      stroke: {
        width: 5,
        curve: "smooth" as const,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 2,
      },
      grid: {
        show: true,
        borderColor: borderColor(),
      },
      tooltip: {
        theme: colorScheme,
        y: {
          title: {
            formatter: () => { return "value"; }
          },
        },
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
        foreColor: foreColor(),
        id: "chart1",
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
      grid: {
        show: true,
        borderColor: borderColor(),
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
          height={chartHeight()}
          minHeight={300}
        />
      </div>
      <div id="chart-line">
        <ReactApexChart
          options={state.optionsLine}
          series={state.seriesLine}
          type="area"
          height={110}
        />
      </div>
    </div>
  );
};
