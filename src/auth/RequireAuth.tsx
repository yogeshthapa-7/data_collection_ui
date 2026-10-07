import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

const RequireAuth = ({ children }: RequireAuthProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  if (!accessToken) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

export default RequireAuth
