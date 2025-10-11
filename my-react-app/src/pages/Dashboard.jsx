import React, { useState, useContext, useMemo } from 'react'
import { motion } from 'framer-motion'
// सुनिश्चित करें कि ये इंपोर्ट सही पथों से हों
import { AuthContext } from '../contexts/AuthContext.jsx'
import { getPasswordStrength } from '../utils/validators.js'
import RotatingBox from './RotatingBox.jsx' 

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [operation, setOperation] = useState('encrypt')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [resultUrl, setResultUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false) // नया: प्रोसेसिंग स्टेट

  const strength = useMemo(() => getPasswordStrength(password), [password])

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0])
    setResultUrl(''); // नया फाइल चुनने पर रिजल्ट क्लियर करें
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert('कृपया एक फ़ाइल अपलोड करें।')
    if (!password) return alert('कृपया पासवर्ड दर्ज करें।')

    if (operation === 'encrypt' && !strength.ok) {
      return alert('एन्क्रिप्शन के लिए एक मजबूत पासवर्ड (8+ वर्णों, अपर/लोअर/अंक/विशेष) का उपयोग करें।')
    }

    setIsProcessing(true)
    setResultUrl('')

    // डेमो: 1.5 सेकंड की प्रोसेसिंग का अनुकरण करें (Simulate processing)
    await new Promise((r) => setTimeout(r, 1500))

    setIsProcessing(false)
    
    // फ्रंटएंड-ओनली डेमो व्यवहार: परिणाम URL सेट करें 
    // (जब बैकएंड तैयार हो, तो यह URL एन्क्रिप्टेड/डिक्रिप्टेड फ़ाइल की ओर इशारा करेगा)
    alert(`${operation.toUpperCase()} ऑपरेशन सफल।`)
    // डेमो के लिए एक डमी URL सेट करें
    setResultUrl('#') 
  }

  const strengthColor = {
    'Too weak': 'bg-red-500',
    'Weak': 'bg-orange-500',
    'Medium': 'bg-yellow-500',
    'Strong': 'bg-emerald-500'
  }[strength.label] || 'bg-slate-300'

  const strengthWidth = Math.min((strength.score / 5) * 100, 100)
  
  const buttonText = isProcessing 
    ? (operation === 'encrypt' ? 'Encrypting...' : 'Decrypting...')
    : (operation === 'encrypt' ? 'ENCRYPT FILE' : 'DECRYPT FILE');

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <header className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">
            Secure File Operations
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium 
                     hover:bg-red-600 transition-all duration-150 shadow-md shadow-red-500/30"
        >
          Logout 🚪
        </motion.button>
      </header>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 16 }}
        // 3D Tilt Effect
        whileHover={{ rotateX: 1, rotateY: 1, z: 3 }}
        style={{ transformPerspective: 1000 }}
        className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-300 max-w-xl mx-auto space-y-6 relative"
      >
        {/* प्रोसेसिंग ओवरले (Processing Overlay) */}
        {isProcessing && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                <p className="mt-4 text-indigo-600 font-semibold">{buttonText}</p>
                <p className="text-sm text-slate-500">Processing file on client-side...</p>
            </div>
        )}

        {/* Welcome Text and 3D Component */}
        <div className="flex items-center justify-between pb-4 border-b border-indigo-100">
            <p className="text-lg font-medium text-slate-700">
              Welcome, <span className="font-bold text-indigo-600">{user?.email || 'User'}</span>
            </p>
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="p-1 w-16 h-16 flex items-center justify-center rounded-full bg-indigo-200/50"
            >
                <RotatingBox /> 
            </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">File Vault Access</h2>
        
        {/* File Input */}
        <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">1. Choose File to Process</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700 transition-colors cursor-pointer"
              accept="*/*"
              disabled={isProcessing}
            />
        </div>

        {/* Operation Radio Buttons */}
        <div className="pt-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">2. Select Operation</label>
            <div className="flex items-center gap-8">
              <label className="inline-flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="operation"
                  value="encrypt"
                  checked={operation === 'encrypt'}
                  onChange={() => setOperation('encrypt')}
                  className="form-radio text-indigo-600 h-4 w-4"
                  disabled={isProcessing}
                />
                <span>Encrypt (🔒)</span>
              </label>
              <label className="inline-flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="operation"
                  value="decrypt"
                  checked={operation === 'decrypt'}
                  onChange={() => setOperation('decrypt')}
                  className="form-radio text-indigo-600 h-4 w-4"
                  disabled={isProcessing}
                />
                <span>Decrypt (🔓)</span>
              </label>
            </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              3. {operation === 'encrypt' ? 'Set Encryption Key' : 'Enter Decryption Key'}
            </label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-14 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                placeholder={operation === 'encrypt' ? 'Create a strong, unique key' : 'Enter existing password'}
                disabled={isProcessing}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium"
                disabled={isProcessing}
              >
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
        </div>

        {/* Strength Meter (केवल एन्क्रिप्ट के लिए) */}
        {operation === 'encrypt' && (
          <>
            <div className="mb-1 h-2 w-full bg-slate-200 rounded overflow-hidden">
              <div
                className={`h-full ${strengthColor} transition-all duration-300`}
                style={{ width: `${strengthWidth}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Strength: <span className="font-semibold">{strength.label}</span> • Recommendation: Use 8+ chars with upper, lower, number, special.
            </p>
          </>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full rounded-lg text-white py-3.5 font-semibold transition-colors shadow-lg ${
            isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/40'
          }`}
          disabled={isProcessing}
        >
          {buttonText}
        </motion.button>

        {/* Download Result (परिणाम डाउनलोड करें) */}
        {resultUrl && (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            href={resultUrl}
            download
            className="block mt-4 text-center text-emerald-600 font-bold text-lg hover:underline"
          >
            Download Processed File (परिणाम डाउनलोड करें)
          </motion.a>
        )}
      </motion.form>
    </div>
  )
}
