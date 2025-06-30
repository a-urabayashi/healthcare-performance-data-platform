'use client'

import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Space, Typography } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '@/store'
import { toggleNavCollapsed } from '@/store/slices/themeSlice'
import { logout } from '@/store/slices/authSlice'
import { authService } from '@/lib/auth'
import AuthGuard from '@/components/auth/AuthGuard'

const { Header, Sider, Content } = Layout
const { Text } = Typography

interface DashboardLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'ダッシュボード',
    href: '/dashboard',
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: '分析',
    children: [
      { key: 'kpi', label: 'KPI分析', href: '/dashboard/kpi' },
      { key: 'comparison', label: '比較分析', href: '/dashboard/comparison' },
      { key: 'monthly', label: '月次レポート', href: '/dashboard/monthly' },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '設定',
    href: '/settings',
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { navCollapsed } = useAppSelector((state) => state.theme)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'プロフィール',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'ログアウト',
      onClick: handleLogout,
    },
  ]

  return (
    <AuthGuard>
      <Layout className="min-h-screen">
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={navCollapsed}
          className="shadow-lg"
        >
          <div className="h-16 flex items-center justify-center border-b border-gray-200">
            <Text className="text-white font-bold text-lg">
              {navCollapsed ? 'HPA' : 'Healthcare Analytics'}
            </Text>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            items={menuItems}
            className="border-right-0"
          />
        </Sider>

        <Layout>
          <Header className="bg-white shadow-sm px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => dispatch(toggleNavCollapsed())}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                {navCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>
            </div>

            <div className="flex items-center">
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space className="cursor-pointer p-2 hover:bg-gray-100 rounded-md">
                  <Avatar icon={<UserOutlined />} />
                  <Text>{user?.name || 'ユーザー'}</Text>
                </Space>
              </Dropdown>
            </div>
          </Header>

          <Content className="p-6 bg-gray-50 overflow-auto">
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthGuard>
  )
}