import React, { useState, useMemo } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { userLogin, getLoggedInUserInfo, getLoggedInMenusInfo } from '@/services/login.service'
import { setUserSession, setUserInfo, setMenus } from '@/services/auth.service'
import { getClientConfig } from '@/config/env'

const { Title, Text } = Typography

interface LoginFormValues {
  username: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const clientConfig = useMemo(() => getClientConfig(), [])

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      const payload = {
        ...values,
        clientcode: import.meta.env.VITE_CLIENT_CODE || 'kmc-dc',
      }

      const response = await userLogin(payload)
      const token = response.token || response.access_token || ''
      const accessToken = response.access_token || response.token || ''
      const refreshToken = response.refresh_token || ''
      const userGroupCode = response.user_group_code || ''
      const clientcode = response.clientcode || payload.clientcode

      setUserSession({
        token,
        access_token: accessToken,
        refresh_token: refreshToken,
        user_group_code: userGroupCode,
        clientcode,
      })

      const [userInfoRes, menusRes] = await Promise.all([
        getLoggedInUserInfo(),
        getLoggedInMenusInfo(),
      ])

      if (userInfoRes.Success && userInfoRes.Data) {
        setUserInfo(userInfoRes.Data)
      }

      if (menusRes.Success && menusRes.Data) {
        setMenus(menusRes.Data)
      }

      message.success('Login successful!')

      if (
        (clientcode === 'kmc-dc' || clientcode === 'kmc-dc-local') &&
        (userGroupCode === 'AD' || userGroupCode === 'SA')
      ) {
        navigate('/auth/login/module', { replace: true })
      } else if (clientcode === 'kmc-dc' && userGroupCode === 'OU') {
        navigate('/features/category/organization', { replace: true })
      } else if (clientcode === 'kmc-dc' && userGroupCode === 'SU-AD') {
        navigate('/quotation/suchikrit-request', { replace: true })
      } else if (
        clientcode === 'kage-prj' ||
        clientcode === 'kmc-prj' ||
        clientcode === 'upcode'
      ) {
        window.location.href = 'https://projectmanagement.himalayankasturi.com.np/'
      } else {
        navigate('/features/category', { replace: true })
      }
    } catch (error: any) {
      const status = error?.response?.status
      if (status === 400) {
        message.error('Credential Not Matched')
      } else {
        message.error('Login Failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* LEFT SIDE - IMAGE */}
      <div className="relative hidden lg:block lg:w-[58%] xl:w-[60%] overflow-hidden">
        <img
          src={clientConfig.mainlogo}
          alt={clientConfig.mainTitle}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16 text-white">
          <div className="mb-4 h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <img
              src={clientConfig.logo}
              alt={clientConfig.mainTitle}
              className="h-10 w-10 object-contain"
            />
          </div>
          <p className="text-sm font-medium tracking-wide opacity-90 mb-2">
            {clientConfig.mainTitle}
          </p>
          <Title level={2} className="!text-white !m-0 !leading-tight mb-3">
            {clientConfig.Heading}
          </Title>
          <Text className="text-sm opacity-80 max-w-md block">
            {clientConfig.Heading2}
            {clientConfig.Heading3 ? ` • ${clientConfig.Heading3}` : ''}
          </Text>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[42%] xl:w-[40%]">
        <div className="w-full max-w-[440px]">
          {/* Header Section */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex items-center gap-3">
              <img
                src={clientConfig.logo3}
                alt="Nepal Flag"
                className="h-12 w-auto object-contain"
              />
              <img
                src={clientConfig.logo4}
                alt="KMC Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            <Title level={3} className="!text-slate-900 !mb-2">
              {clientConfig.mainHeading}
            </Title>

            <div className="mt-4 flex items-center gap-2.5">
              <img
                src={clientConfig.logo2}
                alt="KMC Logo"
                className="h-8 w-8 object-contain"
              />
              <Text strong className="text-base text-slate-700">
                {clientConfig.Heading}
              </Text>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <div className="h-px w-8 bg-slate-300" />
              <span>{clientConfig.Heading2}</span>
              {clientConfig.Heading3 && (
                <>
                  <span className="text-slate-400">•</span>
                  <span>{clientConfig.Heading3}</span>
                </>
              )}
              <div className="h-px w-8 bg-slate-300" />
            </div>
          </div>

          {/* Login Form Card */}
          <Card
            className="!rounded-2xl !border-slate-200/80 !shadow-xl !shadow-slate-200/50"
            styles={{ body: { padding: '32px' } }}
          >
            <div className="mb-6">
              <Title level={4} className="!text-slate-900 !mb-1">
                Welcome back
              </Title>
              <Text className="text-sm text-slate-500">
                Enter your credentials to access the portal
              </Text>
            </div>

            <Form
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              size="large"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-slate-400" />}
                  placeholder="Enter your username"
                  className="!rounded-xl"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-slate-400" />}
                  placeholder="Enter your password"
                  className="!rounded-xl"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="!rounded-xl !h-12 !text-base !font-semibold"
                  style={{
                    background: '#4F46E5',
                    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.35)',
                  }}
                >
                  Sign me in
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>Secured with enterprise-grade encryption</span>
            </div>
          </Card>

          <div className="mt-8 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/60 p-4 text-center">
            <Text className="text-xs leading-relaxed text-slate-600 italic">
              *{clientConfig.slogan}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
