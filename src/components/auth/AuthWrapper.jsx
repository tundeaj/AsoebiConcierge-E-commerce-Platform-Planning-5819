import React from 'react'
import { AuthProvider } from '../../hooks/useAuth'

const AuthWrapper = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default AuthWrapper