import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'

import { AuthContextProviderProps, AuthContextType } from '@/lib/types/auth'

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null)

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then((token) => setAuthToken(token))
      .catch((error) =>
        console.error('Error retrieving token from AsyncStorage:', error),
      )
  }, [])

  function authenticate(token: string | null) {
    setAuthToken(token)
    AsyncStorage.setItem('token', token || '').catch((error) =>
      console.error('Error storing token in AsyncStorage:', error),
    )
  }

  function logout() {
    setAuthToken(null)
    AsyncStorage.removeItem('token').catch((error) =>
      console.error('Error removing token from AsyncStorage:', error),
    )
  }

  const value: AuthContextType = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
