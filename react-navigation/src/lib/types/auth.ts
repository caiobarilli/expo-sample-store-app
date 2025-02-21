import { ReactNode } from 'react'

export interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  authenticate: (token: string | null) => void
  logout: () => void
}

export interface AuthContextProviderProps {
  children: ReactNode
}
