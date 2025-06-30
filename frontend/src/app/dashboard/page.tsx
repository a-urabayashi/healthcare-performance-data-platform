'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Select, DatePicker, Space, Typography, Progress, Tag } from 'antd';
import { Line, Column, Pie } from '@ant-design/charts';
import { 
  DollarOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  TrendingUpOutlined,
  HeartOutlined,
  MedicineBoxOutlined 
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface RevenueData {
  month: string;
  revenue: number;
  patients: number;
  avgPerPatient: number;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  totalSpent: number;
  status: 'active' | 'inactive' | 'new';
}

interface DepartmentData {
  department: string;
  revenue: number;
  patients: number;
  percentage: number;
}

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const revenueData: RevenueData[] = [
    { month: '2024-01', revenue: 2500000, patients: 450, avgPerPatient: 5556 },
    { month: '2024-02', revenue: 2800000, patients: 520, avgPerPatient: 5385 },
    { month: '2024-03', revenue: 3200000, patients: 580, avgPerPatient: 5517 },
    { month: '2024-04', revenue: 2900000, patients: 510, avgPerPatient: 5686 },
    { month: '2024-05', revenue: 3400000, patients: 620, avgPerPatient: 5484 },
    { month: '2024-06', revenue: 3600000, patients: 650, avgPerPatient: 5538 },
  ];

  const departmentData: DepartmentData[] = [
    { department: '内科', revenue: 8500000, patients: 1200, percentage: 35 },
    { department: '外科', revenue: 6200000, patients: 800, percentage: 26 },
    { department: '小児科', revenue: 4800000, patients: 950, percentage: 20 },
    { department: '整形外科', revenue: 2900000, patients: 420, percentage: 12 },
    { department: 'その他', revenue: 1600000, patients: 280, percentage: 7 },
  ];

  const patientData: PatientData[] = [
    { id: 'P001', name: '田中 太郎', age: 45, lastVisit: '2024-06-28', totalSpent: 125000, status: 'active' },
    { id: 'P002', name: '佐藤 花子', age: 32, lastVisit: '2024-06-27', totalSpent: 89000, status: 'active' },
    { id: 'P003', name: '鈴木 一郎', age: 67, lastVisit: '2024-06-25', totalSpent: 234000, status: 'active' },
    { id: 'P004', name: '高橋 美咲', age: 28, lastVisit: '2024-06-20', totalSpent: 45000, status: 'new' },
    { id: 'P005', name: '山田 健太', age: 55, lastVisit: '2024-05-15', totalSpent: 178000, status: 'inactive' },
  ];

  const revenueChartConfig = {
    data: revenueData,
    xField: 'month',
    yField: 'revenue',
    smooth: true,
    color: '#1890ff',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const departmentChartConfig = {
    data: departmentData,
    angleField: 'revenue',
    colorField: 'department',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}%',
    },
    interactions: [{ type: 'element-active' }],
  };

  const patientColumns: ColumnsType<PatientData> = [
    {
      title: '患者ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '患者名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年齢',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '最終来院日',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
    },
    {
      title: '累計支払額',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value: number) => `¥${value.toLocaleString()}`,
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'active' ? 'green' : status === 'new' ? 'blue' : 'orange';
        const text = status === 'active' ? 'アクティブ' : status === 'new' ? '新規' : '非アクティブ';
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const patientGrowth = ((currentMonth.patients - previousMonth.patients) / previousMonth.patients * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="mb-2">
            <HeartOutlined className="mr-3 text-red-500" />
            ヘルスケア分析ダッシュボード
          </Title>
          <Text type="secondary">医療機関の収益とパフォーマンス分析</Text>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <Space size="large">
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              style={{ width: 120 }}
            >
              <Select.Option value="week">週間</Select.Option>
              <Select.Option value="month">月間</Select.Option>
              <Select.Option value="quarter">四半期</Select.Option>
              <Select.Option value="year">年間</Select.Option>
            </Select>
            <RangePicker />
          </Space>
        </div>

        {/* KPI Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="今月の収益"
                value={currentMonth.revenue}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
                suffix="円"
              />
              <div className="mt-2">
                <Text type="secondary">前月比: </Text>
                <Text type={parseFloat(revenueGrowth) > 0 ? 'success' : 'danger'}>
                  {revenueGrowth}%
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="今月の患者数"
                value={currentMonth.patients}
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
                suffix="人"
              />
              <div className="mt-2">
                <Text type="secondary">前月比: </Text>
                <Text type={parseFloat(patientGrowth) > 0 ? 'success' : 'danger'}>
                  {patientGrowth}%
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="患者単価"
                value={currentMonth.avgPerPatient}
                precision={0}
                valueStyle={{ color: '#722ed1' }}
                prefix={<MedicineBoxOutlined />}
                suffix="円"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="稼働率"
                value={87.5}
                precision={1}
                valueStyle={{ color: '#eb2f96' }}
                prefix={<TrendingUpOutlined />}
                suffix="%"
              />
              <Progress percent={87.5} showInfo={false} strokeColor="#eb2f96" />
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} lg={16}>
            <Card title="収益推移" extra={<CalendarOutlined />}>
              <Line {...revenueChartConfig} height={300} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="診療科別収益">
              <Pie {...departmentChartConfig} height={300} />
            </Card>
          </Col>
        </Row>

        {/* Department Performance */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col span={24}>
            <Card title="診療科別パフォーマンス">
              <Row gutter={[16, 16]}>
                {departmentData.map((dept, index) => (
                  <Col xs={24} sm={12} lg={8} xl={4.8} key={index}>
                    <Card size="small" className="text-center">
                      <Title level={4} className="mb-2">{dept.department}</Title>
                      <Statistic
                        value={dept.revenue}
                        precision={0}
                        suffix="円"
                        valueStyle={{ fontSize: '16px' }}
                      />
                      <div className="mt-2">
                        <Text type="secondary">{dept.patients}人</Text>
                      </div>
                      <Progress 
                        percent={dept.percentage} 
                        showInfo={false} 
                        strokeColor="#52c41a"
                        className="mt-2"
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Patient Table */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="最近の患者データ" extra={<UserOutlined />}>
              <Table
                columns={patientColumns}
                dataSource={patientData}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;