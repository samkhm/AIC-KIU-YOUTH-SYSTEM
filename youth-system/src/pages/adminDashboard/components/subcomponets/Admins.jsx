import React, { useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaEdit, FaTrash } from "react-icons/fa"

import { getUserRole } from "@/utils/auth"

export default function Admins({
  users,
  loadingUser,
  updateUser,
  loadingUserUpdate,
  message,
  messageType,
  deleteUser,
  loadDelUser
}) {

  const userRole = getUserRole()

  const admins = users.filter((u) => u.role === "admin")


  const [selectedUser, setSelectedUser] = useState(null)

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")

  // Frontend validation errors
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState("")

  const openEditDialog = (user) => {
    setSelectedUser(user)
    setFname(user.fname || "")
    setLname(user.lname || "")
    setEmail(user.email || "")
    setPhone(user.phone || "")
    setRole(user.role || "")
    setError("")
    setErrorType("")
  }

  const normalizePhone = (phone) => {
    const trimmed = phone.trim()

    // Already in international format
    if (/^254\d{9}$/.test(trimmed)) {
      return trimmed
    }

    // Local formats: 07XXXXXXXX or 01XXXXXXXX
    if (/^(07|01)\d{8}$/.test(trimmed)) {
      return "254" + trimmed.slice(1)
    }

    if (/^\+254\d{9}$/.test(trimmed)) {
      return trimmed.slice(1)
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedUser) return

    // Reset previous errors
    setError("")
    setErrorType("")

    // Validation
    if (
      !fname.trim() ||
      !lname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !role
    ) {
      setError("All fields are required")
      setErrorType("error")
      return
    }

    if (!/^[A-Za-z]+$/.test(fname) || !/^[A-Za-z]+$/.test(lname)) {
      setError("Names must contain letters only")
      setErrorType("error")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address")
      setErrorType("error")
      return
    }

    const normalizedPhone = normalizePhone(phone)

    if (!normalizedPhone) {
      setError("Invalid phone number format")
      setErrorType("error")
      return
    }

    const payload = {
      fname,
      lname,
      email,
      phone: normalizedPhone,
      role,
    }

    try {
      await updateUser(selectedUser._id, payload)
      setError("")
      setErrorType("")
    } catch (err) {
      setError("Failed to update user")
      setErrorType("error")
    }
  }

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full overflow-x-auto border-l-4 border-blue-400 rounded pl-2 sm:pl-4 max-h-[60vh] overflow-y-auto">
        <table className="min-w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-3 py-2 text-center">No.</th>
              <th className="px-2 sm:px-3 py-2 text-center">First Name</th>
              <th className="px-2 sm:px-3 py-2 text-center">Last Name</th>
              <th className="px-2 sm:px-3 py-2 text-center">Email</th>
              <th className="px-2 sm:px-3 py-2 text-center">Phone</th>
              <th className="px-2 sm:px-3 py-2 text-center">Role</th>
              <th className="px-2 sm:px-3 py-2 text-center">Status</th>
              <th className="px-2 sm:px-3 py-2 text-center">Edit</th>
              <th className="px-2 sm:px-3 py-2 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {loadingUser ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading admins...
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No admins found
                </td>
              </tr>
            ) : (
              admins.map((admin, index) => (
                <tr key={admin._id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.fname}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.lname}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.email}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.phone}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    <span className="px-2 py-1 rounded bg-yellow-200">{admin.role}</span>
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    <span className={`px-2 py-1 rounded ${admin.status ? 'bg-green-200' : 'bg-red-200'}`}>
                      {admin.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    {/* Edit dialog here */}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    {/* Delete button here */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}
