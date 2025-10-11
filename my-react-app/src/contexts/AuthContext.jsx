import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

const DEMO_EMAIL = 'demo@securefile.app'
const DEMO_PASSWORD = 'Demo@123'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  // Frontend-only mock login
  const login = async (email, password) => {
    // Simulate small network delay
    await new Promise((r) => setTimeout(r, 300))

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const fakeUser = { email: DEMO_EMAIL, name: 'Demo User' }
      const fakeToken = 'mock-token-' + Math.random().toString(36).slice(2)
      setUser(fakeUser)
      localStorage.setItem('user', JSON.stringify(fakeUser))
      localStorage.setItem('token', fakeToken)
      return true
    }
    // Optional: allow any non-empty creds for pure demo mode
    // if (email && password) { ... }
    return false
  }

  // Frontend-only mock register: accept anything and log in immediately
  const register = async (email, password) => {
    await new Promise((r) => setTimeout(r, 300))
    if (!email || !password) return false
    const fakeUser = { email, name: 'New User' }
    const fakeToken = 'mock-token-' + Math.random().toString(36).slice(2)
    setUser(fakeUser)
    localStorage.setItem('user', JSON.stringify(fakeUser))
    localStorage.setItem('token', fakeToken)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
