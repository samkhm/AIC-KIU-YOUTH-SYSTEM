import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaTrash, FaEdit } from "react-icons/fa"
import { getUserRole } from "@/utils/auth"
import { TailSpin } from 'react-loader-spinner'

export default function RegisteredYouths({
  users,
  loadingUser,
  updateUser,
  loadingUserUpdate,
  message,
  messageType,
  deleteUser,
  loadDelUser
}) {

  const userRole = getUserRole();

  const reg_users = users.filter(u => u.role === "user")


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

<div className="flex flex-col flex-1 w-full min-w-0 max-w-full">
  <h4 className="text-md italic mb-2">Registered youths</h4>

  <div className="w-full max-w-full min-w-0">
    <div className="w-full max-w-full max-h-64 overflow-x-auto overflow-y-auto ">
      <div className="max-w-full w-64">
      <table className="text-sm text-gray-700">
        <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-center">No.</th>
              <th className="px-3 py-2 text-center">First Name</th>
              <th className="px-3 py-2 text-center">Last Name</th>
              <th className="px-3 py-2 text-center">Email</th>
              <th className="px-3 py-2 text-center">Phone</th>
              <th className="px-3 py-2 text-center">Role</th>
              <th className="px-3 py-2 text-center">Status</th>
              <th className="px-3 py-2 text-center">Edit</th>
              <th className="px-3 py-2 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {loadingUser ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading users...
                </td>
              </tr>
            ) : reg_users.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No Registered Youths Found
                </td>
              </tr>
            ) : (
              reg_users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{user.fname}</td>
                  <td className="px-3 py-2 text-center">{user.lname}</td>
                  <td className="px-3 py-2 text-center">{user.email}</td>
                  <td className="px-3 py-2 text-center">{user.phone}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-white  ${user.role === "admin" ? "bg-blue-500" : "bg-yellow-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-2 py-1 rounded bg-green-400 border rounded border-yellow-430 ${ user.status ? "text-white" : ""}`}>
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-3 py-2 text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => openEditDialog(user)}
                          className="hover:text-green-500"
                        >
                          <FaEdit size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="w-fit">
                        <DialogHeader>
                          <DialogTitle>Update User Info</DialogTitle>
                        </DialogHeader>

                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-3 mt-2"
                        >
                          {/* Frontend validation errors */}
                          {error && (
                            <p className="text-sm italic text-red-500">
                              {error}
                            </p>
                          )}

                          {/* Backend messages */}
                          {message && (
                            <p
                              className={`text-sm italic ${messageType === "success"
                                  ? "text-green-500"
                                  : messageType === "error"
                                    ? "text-red-500"
                                    : ""
                                }`}
                            >
                              {message}
                            </p>
                          )}

                          <input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            placeholder="First name"
                            className="border rounded px-2 py-1"
                          />

                          <input
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            placeholder="Last name"
                            className="border rounded px-2 py-1"
                          />

                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="border rounded px-2 py-1"
                          />

                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            className="border rounded px-2 py-1"
                          />

                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border rounded px-2 py-1"
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            {
                              userRole === "moderator" && (

                                <option value="moderator">moderator</option>
                              )
                            }
                          </select>

                          <button
                            type="submit"
                            disabled={loadingUserUpdate}

                            className="border border-blue-500 text-blue-600 rounded py-1 hover:bg-green-200"
                          >
                            {loadingUserUpdate ? "Updating..." : "Update"}
                          </button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </td>

                  <td className="px-3 py-2 text-center cursor-pointer">
                    {loadDelUser === user._id ? (
                      <TailSpin height={15} width={15} ariaLabel="loading" />
                    ) : (
                      <FaTrash
                        size={18}
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-300"
                      />
                    )}


                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      </div>
  
  )
}
