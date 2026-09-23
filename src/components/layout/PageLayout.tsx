import { ReactNode } from 'react'
import GovernmentBackground from './GovernmentBackground'

interface PageLayoutProps {
  children: ReactNode
  showBackground?: boolean
}

const PageLayout = ({ children, showBackground = true }: PageLayoutProps) => {
  return (
    <>
      {showBackground && <GovernmentBackground />}
      {children}
    </>
  )
}

export default PageLayout
