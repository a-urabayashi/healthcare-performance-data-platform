'use client'

import { Card } from 'antd'
import { Column, Line } from '@ant-design/charts'

interface ChartData {
  categories: string[]
  series: Array<{
    name: string
    data: number[]
  }>
}

interface ChartCardProps {
  title: string
  data: ChartData
  type: 'line' | 'column' | 'bar'
  height?: number
  loading?: boolean
}

export default function ChartCard({
  title,
  data,
  type,
  height = 250,
  loading = false,
}: ChartCardProps) {
  // Transform data for Ant Design Charts
  const transformedData = data.categories.flatMap((category, index) =>
    data.series.map((serie) => ({
      category,
      value: serie.data[index],
      type: serie.name,
    }))
  )

  const commonConfig = {
    data: transformedData,
    xField: 'category',
    yField: 'value',
    seriesField: 'type',
    height,
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line {...commonConfig} />
      case 'column':
        return <Column {...commonConfig} />
      default:
        return <Line {...commonConfig} />
    }
  }

  return (
    <Card 
      title={title} 
      className="shadow-card hover:shadow-lg transition-shadow"
      loading={loading}
    >
      <div className="chart-container">
        {renderChart()}
      </div>
    </Card>
  )
}