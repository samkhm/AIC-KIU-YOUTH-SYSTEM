import React from 'react'
import Box from '@/pages/adminDashboard/components/subcomponets/Box'
import { IoArrowBack } from 'react-icons/io5'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
export default function CornfirmEmailForm({
  identifier,
  setIdentifier,
  errors, setErrors, onSubmit, loading,
  message, setMessage, messageType
}) {


  return (
    <Box>
      <div className="w-full max-w-lg mx-auto px-2 ">
        <form
          onSubmit={onSubmit}
          onClick={() => setMessage('')}
          className="flex flex-col bg-white/80 backdrop-blur p-4 sm:p-6 rounded-lg gap-4 shadow-md animate__animated animate__zoomIn animate__delay-1s"
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
            <label className="text-sm font-medium ">Email or Username</label>
            <input
              type="text"
              className="border rounded p-2 w-full text-sm "
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value)
                if (errors.identifier)
                  setErrors((p) => ({ ...p, identifier: '' }))
              }}
            />
            <p className="text-xs text-red-500 ">{errors.identifier}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">

          <a href="/login">
        <FaArrowAltCircleLeft size={20} className='text-blue-500'/>
        </a>       
           
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition animate__animated animate__zoomIn animate__delay-1s"
            >
              {loading ? 'Cornfirming...' : 'Cornfirm'}
            </button>
          </div>
         
        </form>
       
      </div>
    </Box>
  )
  
}
