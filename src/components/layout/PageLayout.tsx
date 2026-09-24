import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import GovernmentBackground from './GovernmentBackground'
import Header from '@/components/Header'
import NavigationMenu from '@/components/NavigationMenu'

interface PageLayoutProps {
  children?: ReactNode
  showBackground?: boolean
}

const PageLayout = ({ children, showBackground = true }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      {showBackground && <GovernmentBackground />}
      <Header />
      <NavigationMenu />
      <main className="relative z-10 p-8">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default PageLayout
