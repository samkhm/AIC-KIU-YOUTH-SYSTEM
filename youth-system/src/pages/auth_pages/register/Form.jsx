import React from 'react'
import Box from '@/pages/adminDashboard/components/subcomponets/Box'
export default function Form({
  fname,
  lname,
  email,
  username,
  phone,
  password,
  cpassword,

  setFname,
  setLname,
  setEmail,
  setUsername,
  setPhone,
  setPassword,
  setCpassword,

  errors,
  setErrors,
  onSubmit,
  loading,

  message,
  setMessage,
  messageType
}) {
  return (
    <Box>
      <div className="w-full max-w-lg mx-auto px-2">
        <form
          onSubmit={onSubmit}
          onClick={() => setMessage('')}
          className="flex flex-col bg-white/80 backdrop-blur p-4 sm:p-6 rounded-lg gap-4 shadow-md"
        >
          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              className="border rounded p-2 w-full text-sm"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (errors.username)
                  setErrors((p) => ({ ...p, username: '' }))
              }}
            />
            <p className="text-xs text-red-500">{errors.username}</p>
          </div>
  
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                className="border rounded p-2 w-full text-sm"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value)
                  if (errors.fname)
                    setErrors((p) => ({ ...p, fname: '' }))
                }}
              />
              <p className="text-xs text-red-500">{errors.fname}</p>
            </div>
  
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="border rounded p-2 w-full text-sm"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value)
                  if (errors.lname)
                    setErrors((p) => ({ ...p, lname: '' }))
                }}
              />
              <p className="text-xs text-red-500">{errors.lname}</p>
            </div>
          </div>
  
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="border rounded p-2 w-full text-sm"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email)
                  setErrors((p) => ({ ...p, email: '' }))
              }}
            />
            <p className="text-xs text-red-500">{errors.email}</p>
          </div>
  
          {/* Phone */}
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              className="border rounded p-2 w-full text-sm"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (errors.phone)
                  setErrors((p) => ({ ...p, phone: '' }))
              }}
            />
            <p className="text-xs text-red-500">{errors.phone}</p>
          </div>
  
          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="border rounded p-2 w-full text-sm"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password)
                    setErrors((p) => ({ ...p, password: '' }))
                }}
              />
              <p className="text-xs text-red-500">{errors.password}</p>
            </div>
  
            <div>
              <label className="text-sm font-medium">Confirm</label>
              <input
                type="password"
                className="border rounded p-2 w-full text-sm"
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value)
                  if (errors.cpassword)
                    setErrors((p) => ({ ...p, cpassword: '' }))
                }}
              />
              <p className="text-xs text-red-500">{errors.cpassword}</p>
            </div>
          </div>
  
          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-center sm:text-left">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 underline">
                Login
              </a>
            </p>
  
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            >
              {loading ? 'Please wait...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </Box>
  )
  
}
