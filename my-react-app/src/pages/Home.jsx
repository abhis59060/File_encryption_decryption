import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RotatingBox from './RotatingBox.jsx' 

// Icon Component
const FeatureIcon = ({ icon, label }) => (
  <motion.div
    variants={rise}
    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="text-4xl text-indigo-600 mb-2">{icon}</div>
    <p className="text-sm font-semibold text-slate-700 text-center">{label}</p>
  </motion.div>
);

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
}
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 14 } }
}

export default function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6"
      initial="hidden"
      animate="show"
      variants={stagger}
    >
      <motion.h1
        variants={rise}
        className="text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600"
      >
        Welcome to SecureFileApp
      </motion.h1>

      <motion.p variants={rise} className="text-slate-600 mb-8 text-lg text-center max-w-xl">
        Secure your critical documents with **bank-grade encryption**. 
        Upload, encrypt, and decrypt your files on any device, anytime.
      </motion.p>

      {/* Login / Register Buttons */}
      <motion.div variants={rise} className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
          <Link className="px-5 py-2.5 rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 transition-colors btn-focus" to="/login">
            Login
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
          <Link className="px-5 py-2.5 rounded-md bg-slate-200 text-slate-900 hover:bg-slate-300 transition-colors btn-focus" to="/register">
            Register
          </Link>
        </motion.div>
      </motion.div>

      <motion.div variants={rise} className="w-80 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded mt-8 relative overflow-hidden">
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* 3D RotatingBox Component rendered here */}
      <motion.div
        variants={rise}
        className="mt-8 p-3 w-32 h-32 flex items-center justify-center bg-white/50 rounded-lg shadow-xl"
      >
        {/* RotatingBox, which provides the 3D animation */}
        <RotatingBox /> 
      </motion.div>
      
      {/* --- New Features Section --- */}
      <motion.div 
        className="mt-16 w-full max-w-4xl"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.h2 variants={rise} className="text-3xl font-bold text-center text-slate-800 mb-8">
            Security and Convenience
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureIcon icon="🔒" label="AES-256 Bit Encryption" />
          <FeatureIcon icon="💻" label="Access on Any Device" />
          <FeatureIcon icon="🌐" label="Completely Private and Secure" />
        </div>
      </motion.div>

      {/* New CTA Text */}
      <motion.p variants={rise} className="text-xl font-medium text-slate-700 mt-12 mb-4">
        Join **SecureFileApp** today!
      </motion.p>
      
    </motion.div>
  )
}