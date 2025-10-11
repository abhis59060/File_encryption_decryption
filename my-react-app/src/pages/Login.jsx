import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext.jsx'
// 3D कंपोनेंट इम्पोर्ट करें
import RotatingBox from './RotatingBox.jsx' 

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 16 }}
        // Form को 3D tilt इफ़ेक्ट दिया गया
        whileHover={{ rotateX: 2, rotateY: -2, z: 5 }} 
        style={{ transformPerspective: 800 }} 
        className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-slate-300" // हल्का padding बढ़ाया गया
      >
        {/* 3D RotatingBox कंपोनेंट यहाँ जोड़ा गया */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            // 3D कंटेनर को एक आकर्षक स्टाइल दिया गया
            className="p-1 w-28 h-28 flex items-center justify-center 
                       bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 
                       rounded-full shadow-lg border-2 border-indigo-400/50"
          >
            <RotatingBox /> 
          </motion.div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">Secure Login</h2>
        <p className="text-center text-sm text-slate-500 mb-6">Access your encrypted files.</p> {/* नया सब-टेक्स्ट जोड़ा गया */}

        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 rounded-lg border border-slate-300 px-4 py-2.5 
                     focus:outline-none focus:ring-4 focus:ring-indigo-200" // Focus ring को बेहतर किया गया
          placeholder="name@example.com"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 rounded-lg border border-slate-300 px-4 py-2.5 
                     focus:outline-none focus:ring-4 focus:ring-indigo-200" // Focus ring को बेहतर किया गया
          placeholder="••••••••"
        />

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 4px 15px rgba(99, 102, 241, 0.5)' }} // Hover पर शैडो इफ़ेक्ट
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full rounded-lg bg-indigo-600 text-white py-3 font-semibold 
                     hover:bg-indigo-700 transition-all duration-200" // बटन को और आकर्षक बनाया गया
        >
          Login
        </motion.button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline">
            Register Here
          </Link>
        </p>
      </motion.form>
    </div>
  )
}
