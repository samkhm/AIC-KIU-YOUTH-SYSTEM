import React, { useEffect, useState } from 'react'
import API from '@/service/api'
import { getUserId } from '@/utils/auth'

export default function Profile() {
  const id = getUserId()

  const [profile, setProfile] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  /* ================= FETCH PROFILE ================= */

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/tasks/getProfile/${id}`)
      setProfile(res.data?.profile)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load profile')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  /* ================= UPDATE PROFILE ================= */

  const updateProfile = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await API.put(`/tasks/updateProfile/${id}`, profile)
      setProfile(res.data?.profile)
      setMessage('Profile updated successfully')
      setMessageType('success')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile()
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex justify-center px-4 py-8 animate__animated animate__zoomIn animate__delay-1s">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        
        {/* Header */}
        <h3 className="text-2xl font-semibold text-center border-b pb-3 text-green-700">
          My Profile
        </h3>

        {/* Message */}
        {message && (
          <p
            className={`text-sm text-center mt-4 ${
              messageType === 'success'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 animate__animated animate__zoomIn animate__delay-2s"
        >
          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full border rounded p-2 text-sm"
              value={profile.username}
              readOnly
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>

          {/* First Name */}
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 text-sm"
              value={profile.fname}
              onChange={(e) =>
                setProfile({ ...profile, fname: e.target.value })
              }
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 text-sm"
              value={profile.lname}
              onChange={(e) =>
                setProfile({ ...profile, lname: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2 text-sm"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              className="w-full border rounded p-2 text-sm"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
