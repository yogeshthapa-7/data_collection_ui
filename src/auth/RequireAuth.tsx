import { Navigate } from 'react-router-dom'
import { isUserLoggedIn } from '@/services/auth.service'

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

export default RequireAuth
