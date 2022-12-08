import React from 'react';
import dynamic from 'next/dynamic';

export type LineChartData = {
  x: string | undefined, 
  y: number
}
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

export const LineChart = ({ data }: { data: LineChartData[] }) => {
  console.log(data)
  const state = {
    series: [
      {
        data: data,
      }
    ],
    options: {
      chart: {
        height: 40,
        type: 'line' as const,
        group: 'sparks' as const,
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#FFFFFF'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth' as const
      },
      markers: {
        size: 0
      },
      grid: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 0
        }
      },
      tooltip: {
        theme: 'dark' as const,
        x: {
          show: true,
        },
        y: {
          title: {
            formatter: () => {
              return 'value:';
            }
          },
          formatter: function (value: number) {
            return value.toFixed(2).concat(' $');
          }
        }
      }
    }
  };

  return (
    <div id="chart">
      {typeof window !== 'undefined' && (
        <div id="chart-timeline">
          <ReactApexChart options={state.options} series={state.series} type="line" height={120} />
        </div>
      )}
    </div>
  );
};
