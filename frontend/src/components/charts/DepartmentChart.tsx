'use client';

import React from 'react';
import { Pie } from '@ant-design/charts';

interface DepartmentData {
  department: string;
  revenue: number;
  patients: number;
  percentage: number;
}

interface DepartmentChartProps {
  data: DepartmentData[];
  height?: number;
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({ data, height = 300 }) => {
  const config = {
    data,
    angleField: 'revenue',
    colorField: 'department',
    radius: 0.8,
    label: {
      type: 'outer' as const,
      content: '{name} {percentage}%',
    },
    interactions: [{ type: 'element-active' }],
    tooltip: {
      formatter: (datum: DepartmentData) => {
        return {
          name: datum.department,
          value: `¥${datum.revenue.toLocaleString()} (${datum.patients}人)`,
        };
      },
    },
    legend: {
      position: 'bottom' as const,
    },
  };

  return <Pie {...config} height={height} />;
};

export default DepartmentChart;