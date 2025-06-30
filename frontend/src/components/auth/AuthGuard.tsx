'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/store'
import { loginSuccess, logout } from '@/store/slices/authSlice'
import { authService } from '@/lib/auth'
import { Spin } from 'antd'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (authService.isAuthenticated()) {
          const token = authService.getToken()
          const deviceId = authService.getDeviceId()
          
          if (token && deviceId && !isAuthenticated) {
            // Restore authentication state
            dispatch(loginSuccess({
              token,
              deviceId,
              user: null, // Will be fetched separately
            }))
          }
        } else {
          dispatch(logout())
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        dispatch(logout())
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuthentication()
  }, [dispatch, router, isAuthenticated])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}