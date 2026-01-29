import React from 'react'
import Box from '@/pages/adminDashboard/components/subcomponets/Box'
export default function Form({
  identifier, password,
  setIdentifier, setPassword,
  errors, setErrors, onSubmit, loading,
  message, setMessage, messageType
}) {
  return (
    <Box>
      <div className="w-full max-w-lg mx-auto px-2">
        <form
          onSubmit={onSubmit}
          onClick={() => setMessage('')}
          className="flex flex-col bg-white/80 backdrop-blur p-4 sm:p-6 rounded-lg gap-4 shadow-md"
        >
          {/* Message */}
          {message && (
            <p
              className={`text-sm ${
                messageType === 'error'
                  ? 'text-red-600'
                  : messageType === 'success'
                  ? 'text-green-600'
                  : 'text-zinc-500'
              }`}
            >
              {message}
            </p>
          )}
  
          {/* Identifier */}
          <div>
            <label className="text-sm font-medium">Email or Username</label>
            <input
              type="text"
              className="border rounded p-2 w-full text-sm"
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value)
                if (errors.identifier)
                  setErrors((p) => ({ ...p, identifier: '' }))
              }}
            />
            <p className="text-xs text-red-500">{errors.identifier}</p>
          </div>
  
          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="border rounded p-2 w-full text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password)
                  setErrors((p) => ({ ...p, password: '' }))
              }}
            />
            <p className="text-xs text-red-500">{errors.password}</p>
          </div>
  
          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-center sm:text-left">
              Not yet registered?{' '}
              <a
                href="/register"
                className="text-blue-500 underline font-medium"
              >
                Register
              </a>
            </p>
  
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            >
              {loading ? 'Please wait...' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </Box>
  )
  
}
