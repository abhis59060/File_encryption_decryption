import { Home as HomeIcon, LogIn, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { AuthContext } from './contexts/AuthContext.jsx'
import { AnimatePresence } from 'framer-motion'

function PrivateRoute({ children }) {
  return (
    <AuthContext.Consumer>
      {({ user, loading }) => {
        if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>
        return user ? children : <Navigate to="/login" replace />
      }}
    </AuthContext.Consumer>
  )
}

function NavButton({ to, icon: Icon, label }) {
  return (
    <Link to={to} className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md">
      <motion.span
        className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/0 via-fuchsia-500/0 to-purple-500/0"
        initial={false}
        whileHover={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.12), rgba(217,70,239,0.12), rgba(147,51,234,0.12))' }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative z-10 inline-flex items-center gap-2 text-slate-700 group-hover:text-slate-900"
      >
        <Icon size={18} className="opacity-80 group-hover:opacity-100" />
        <span className="text-sm font-medium">{label}</span>
      </motion.span>
    </Link>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
            SecureFileApp
          </Link>

          <div className="flex items-center gap-1">
            <NavButton to="/" icon={HomeIcon} label="Home" />
            <NavButton to="/login" icon={LogIn} label="Login" />
            <NavButton to="/register" icon={UserPlus} label="Register" />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
