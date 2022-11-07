import React from "react";
import { gradient } from "./utils";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartData {
  data: number[][];
}

export const AreaChart = ({ data }: ChartData) => {
  // TODO: get colorScheme from localStorage
  const colorScheme = "dark";
  
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const state = {
    walletValue: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area" as const,
        theme: colorScheme,
        colors: ["#3eadcf"],
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              show: true,
              text: "Current value",
              style: {
                color: "#fff",
                background: "#00A88F",
              },
            },
          },
        ],
        //   xaxis: [{
        //     x: new Date('14 Nov 2012').getTime(),
        //     borderColor: '#999',
        //     yAxisIndex: 0,
        //     label: {
        //       show: true,
        //       text: 'Today',
        //       style: {
        //         color: "#fff",
        //         background: '#775DD0'
        //       }
        //     }
        //   }]
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime" as const,
        min: firstDay.getTime(),
        max: lastDay.getTime(),
        tickAmount: 6,
        colors: ['#F44336', '#E91E63', '#9C27B0']
      },
      tooltip: {
        theme: colorScheme,
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: gradient,
      },
    },
    selection: "one_year",
  };

  return (
    <div id="chart">
      {typeof window !== "undefined" && (
        <div id="chart-timeline">
          <ReactApexChart
            options={state.options}
            series={state.walletValue}
            type="area"
            height={350}
          />
        </div>
      )}
    </div>
  );
};
