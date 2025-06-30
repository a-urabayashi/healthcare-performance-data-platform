'use client';

import React from 'react';
import { Line } from '@ant-design/charts';

interface RevenueData {
  month: string;
  revenue: number;
  patients: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  height?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, height = 300 }) => {
  const config = {
    data,
    xField: 'month',
    yField: 'revenue',
    smooth: true,
    color: '#1890ff',
    point: {
      size: 5,
      shape: 'diamond' as const,
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    tooltip: {
      formatter: (datum: RevenueData) => {
        return {
          name: '収益',
          value: `¥${datum.revenue.toLocaleString()}`,
        };
      },
    },
    annotations: [
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#FF4D4F',
          lineDash: [2, 2],
        },
      },
    ],
  };

  return <Line {...config} height={height} />;
};

export default RevenueChart;