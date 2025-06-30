import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'
import { StoreProvider } from '@/store/providers'
import { QueryProvider } from '@/lib/query-provider'
import jaJP from 'antd/locale/ja_JP'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Healthcare Performance Analytics',
  description: 'Dental clinic management and performance analytics system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>
            <ConfigProvider locale={jaJP}>
              {children}
            </ConfigProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  )
}