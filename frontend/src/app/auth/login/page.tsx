'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Card, Alert, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/store'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import { authService } from '@/lib/auth'

interface LoginForm {
  email: string
  password: string
  otpCode?: string
}

export default function LoginPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showOtp, setShowOtp] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onFinish = async (values: LoginForm) => {
    setLoading(true)
    setError(null)
    dispatch(loginStart())

    try {
      const result = await authService.login(values.email, values.password, values.otpCode)
      
      dispatch(loginSuccess(result))
      router.push('/dashboard')
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ログインに失敗しました'
      
      if (err.response?.status === 402) {
        // OTP required
        setShowOtp(true)
        setError('OTP認証が必要です')
      } else {
        setError(errorMessage)
        dispatch(loginFailure(errorMessage))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Healthcare Performance Analytics
          </h1>
          <p className="text-gray-600 mt-2">アカウントにログイン</p>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            className="mb-4"
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="メールアドレス"
            rules={[
              { required: true, message: 'メールアドレスを入力してください' },
              { type: 'email', message: '有効なメールアドレスを入力してください' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="メールアドレス"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="パスワード"
            rules={[{ required: true, message: 'パスワードを入力してください' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="パスワード"
              autoComplete="current-password"
            />
          </Form.Item>

          {showOtp && (
            <Form.Item
              name="otpCode"
              label="OTPコード"
              rules={[{ required: true, message: 'OTPコードを入力してください' }]}
            >
              <Input
                placeholder="6桁のOTPコード"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : 'ログイン'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <a href="/auth/forgot-password" className="text-primary-500 hover:text-primary-600">
            パスワードを忘れた方
          </a>
        </div>
      </Card>
    </div>
  )
}