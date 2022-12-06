import React from 'react';
import dynamic from 'next/dynamic';
import { chartGradient } from './utils';
import { useViewportSize } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

export interface BrushChartProps {
  data: number[][];
}

export const BrushChart = ({ data }: BrushChartProps) => {
  const theme = useMantineTheme();

  const { height } = useViewportSize();

  const chartHeight = () => {
    const offset = 450;
    return Math.max(350, height - offset);
  };

  const foreColor = theme.colorScheme === 'dark' ? '#FFFFFF' : '#000000';
  const borderColor = theme.colorScheme === 'dark' ? '#222324' : '#e8ebed';

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const state = {
    series: [
      {
        data: data
      }
    ],
    options: {
      chart: {
        foreColor,
        id: 'chart2',
        type: 'line' as const,
        height: 110,
        colors: ['#3eadcf'],
        toolbar: {
          autoSelected: 'pan' as const,
          show: false
        }
      },
      colors: ['#3eadcf'],
      background: 'transparent',
      stroke: {
        width: 5,
        curve: 'smooth' as const
      },
      fill: {
        opacity: 1
      },
      markers: {
        size: 2
      },
      grid: {
        show: true,
        borderColor
      },
      tooltip: {
        theme: theme.colorScheme,
        y: {
          formatter: undefined,
          title: {
            formatter: () => {
              return 'value:';
            }
          }
        }
      },
      xaxis: {
        type: 'datetime' as const
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          }
        }
      }
    },
    seriesLine: [
      {
        data: data
      }
    ],
    optionsLine: {
      chart: {
        foreColor,
        id: 'chart1',
        type: 'area' as const,
        brush: {
          target: 'chart2',
          enabled: true
        },
        selection: {
          enabled: true,
          xaxis: {
            min: firstDay.getTime(),
            max: lastDay.getTime()
          }
        }
      },
      grid: {
        show: true,
        borderColor
      },
      colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: chartGradient
      },
      xaxis: {
        type: 'datetime' as const,
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        tickAmount: 2,
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          }
        }
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="line" height={chartHeight()} />
      <ReactApexChart options={state.optionsLine} series={state.seriesLine} type="area" height={110} />
    </div>
  );
};
