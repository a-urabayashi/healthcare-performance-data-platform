'use client'

import { Row, Col, Card, Statistic, Typography } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatisticCard from '@/components/shared/StatisticCard'
import ChartCard from '@/components/shared/ChartCard'

const { Title } = Typography

export default function DashboardPage() {
  const kpiData = [
    {
      title: '今月の売上',
      value: 2500000,
      prefix: '¥',
      suffix: '',
      precision: 0,
      trend: 'up',
      trendValue: 12.5,
    },
    {
      title: '新患数',
      value: 45,
      suffix: '人',
      trend: 'up',
      trendValue: 8.2,
    },
    {
      title: '稼働率',
      value: 85.6,
      suffix: '%',
      precision: 1,
      trend: 'down',
      trendValue: 2.1,
    },
    {
      title: 'リコール率',
      value: 72.3,
      suffix: '%',
      precision: 1,
      trend: 'up',
      trendValue: 5.4,
    },
  ]

  const salesData = {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      {
        name: '売上',
        data: [2100000, 2300000, 2200000, 2400000, 2350000, 2500000],
      },
    ],
  }

  const patientData = {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      {
        name: '新患数',
        data: [38, 42, 35, 48, 41, 45],
      },
      {
        name: '再診数',
        data: [245, 268, 232, 289, 251, 276],
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Title level={2}>ダッシュボード</Title>
          <p className="text-gray-600">クリニックの経営指標を確認できます</p>
        </div>

        {/* KPI Cards */}
        <Row gutter={[16, 16]}>
          {kpiData.map((kpi, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <StatisticCard {...kpi} />
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <ChartCard
              title="月別売上推移"
              data={salesData}
              type="line"
              height={300}
            />
          </Col>
          <Col xs={24} lg={12}>
            <ChartCard
              title="患者数推移"
              data={patientData}
              type="column"
              height={300}
            />
          </Col>
        </Row>

        {/* Additional Dashboard Content */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="最近のアクティビティ" className="h-64">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>新患の田中様が予約されました</span>
                  <span className="text-gray-500 text-sm">2時間前</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>月次レポートが更新されました</span>
                  <span className="text-gray-500 text-sm">1日前</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>設備点検が完了しました</span>
                  <span className="text-gray-500 text-sm">3日前</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="今日の予定" className="h-64">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">09:00 - 佐藤様</div>
                    <div className="text-sm text-gray-500">定期検診</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">10:30 - 山田様</div>
                    <div className="text-sm text-gray-500">クリーニング</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">14:00 - 田中様</div>
                    <div className="text-sm text-gray-500">初診</div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  )
}
