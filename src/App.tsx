import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import AuthLayout from '@/auth/AuthLayout'
import LoginPage from '@/auth/LoginPage'
import ModulePage from '@/auth/ModulePage'
import RequireAuth from '@/auth/RequireAuth'
import PageLayout from '@/components/layout/PageLayout'
import CategoryPage from '@/pages/category/Category'
import CategoryGroupPage from '@/pages/categoty-group/category_group'

function RootApp() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4F46E5',
          borderRadius: 12,
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Card: {
            borderRadiusLG: 16,
          },
          Button: {
            borderRadius: 10,
          },
          Input: {
            borderRadius: 10,
          },
          Select: {
            borderRadius: 10,
          },
          Modal: {
            borderRadiusLG: 16,
          },
        },
      }}
      modal={{
        style: { zIndex: 10001 },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route
              path="/auth/login/module"
              element={
                <RequireAuth>
                  <ModulePage />
                </RequireAuth>
              }
            />
          </Route>
          <Route element={<PageLayout />}>
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category-group" element={<CategoryGroupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default RootApp
