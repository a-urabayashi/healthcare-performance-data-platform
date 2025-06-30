'use client'

import { Card, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

interface StatisticCardProps {
  title: string
  value: number | string
  prefix?: string
  suffix?: string
  precision?: number
  trend?: 'up' | 'down'
  trendValue?: number
  loading?: boolean
}

export default function StatisticCard({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  trend,
  trendValue,
  loading = false,
}: StatisticCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') {
      return <ArrowUpOutlined className="text-green-500" />
    }
    if (trend === 'down') {
      return <ArrowDownOutlined className="text-red-500" />
    }
    return null
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500'
    if (trend === 'down') return 'text-red-500'
    return 'text-gray-500'
  }

  return (
    <Card className="shadow-card hover:shadow-lg transition-shadow">
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        precision={precision}
        loading={loading}
        valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
      />
      {trend && trendValue && (
        <div className={`flex items-center mt-2 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="ml-1 text-sm">
            {trendValue}% 前月比
          </span>
        </div>
      )}
    </Card>
  )
}