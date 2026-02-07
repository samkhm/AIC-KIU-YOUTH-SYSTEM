import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getUserRole } from '@/utils/auth'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function SuperAdmins({
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
  const superAdmin = users.filter(u => u.role === "moderator")

  const [selectedUser, setSelectedUser] = useState(null)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState("")

  const openEditDialog = (mod) => {
    setSelectedUser(mod)
    setFname(mod.fname || "")
    setLname(mod.lname || "")
    setEmail(mod.email || "")
    setPhone(mod.phone || "")
    setRole(mod.role || "")
    setError("")
    setErrorType("")
  }

  const normalizePhone = (phone) => {
    const trimmed = phone.trim()
    if (/^254\d{9}$/.test(trimmed)) return trimmed
    if (/^(07|01)\d{8}$/.test(trimmed)) return "254" + trimmed.slice(1)
    if (/^\+254\d{9}$/.test(trimmed)) return trimmed.slice(1)
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedUser) return;

    setError("")
    setErrorType("")

    if (!fname.trim() || !lname.trim() || !email.trim() || !phone.trim() || !role) {
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

    const payload = { fname, lname, email, phone: normalizedPhone, role }
    try {
      await updateUser(selectedUser._id, payload)
      setError("")
      setErrorType("")
    } catch (error) {
      console.log(error)
      setError("Failed to update user")
      setErrorType("error")
    }
  }

  return (
<div className="flex flex-col flex-1 w-full min-w-0 max-w-full">
  <h4 className="text-md italic mb-2">Super Admins</h4>

  <div className="w-full max-w-full min-w-0 flex">
    <div className="w-full max-w-full max-h-64 overflow-x-auto overflow-y-auto">
      <div className="max-w-full w-64">
      <table className="text-sm text-gray-700">
     <thead className="bg-gray-100 sticky top-0 z-10">
      <tr>
        <th className="px-3 py-2 text-center min-w-[40px]">No.</th>
        <th className="px-3 py-2 text-center min-w-[80px]">First Name</th>
        <th className="px-3 py-2 text-center min-w-[80px]">Last Name</th>
        <th className="px-3 py-2 text-center min-w-[120px]">Email</th>
        <th className="px-3 py-2 text-center min-w-[100px]">Phone</th>
        <th className="px-3 py-2 text-center min-w-[80px]">Role</th>
        {/* <th className="px-3 py-2 text-center min-w-[80px]">Status</th> */}
        {userRole === "moderator" && (
          <>
            <th className="px-3 py-2 text-center min-w-[60px]">Edit</th>
            <th className="px-3 py-2 text-center min-w-[60px]">Delete</th>
          </>
        )}
      </tr>
    </thead>

    <tbody>
      {loadingUser ? (
        <tr>
          <td colSpan={userRole === "moderator" ? 9 : 7} className="text-center py-4">Loading users...</td>
        </tr>
      ) : superAdmin.length === 0 ? (
        <tr>
          <td colSpan={userRole === "moderator" ? 9 : 7} className="text-center py-4">No super admins found</td>
        </tr>
      ) : (
        superAdmin.map((mod, index) => (
          <tr key={mod._id || index} className="hover:bg-gray-50">
            <td className="px-3 py-2 text-center">{index + 1}</td>
            <td className="px-3 py-2 text-center">{mod.fname}</td>
            <td className="px-3 py-2 text-center">{mod.lname}</td>
            <td className="px-3 py-2 text-center">{mod.email}</td>
            <td className="px-3 py-2 text-center">{mod.phone}</td>
            <td className="px-3 py-2 text-center">
              <span className="bg-blue-500 p-1 rounded text-white">{mod.role}</span>
            </td>
            {/* <td className="px-3 py-2 text-center">
              <span className={`px-2 py-1 rounded bg-green-400 border rounded border-yellow-430 ${ mod.status ? "text-white" : ""}`}>
                {mod.status ? "Online" : "Offline"}
              </span>
            </td> */}
            {userRole === "moderator" && (
              <>
                {/* Edit Button */}
                <td className="px-3 py-2 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => openEditDialog(mod)}
                        className="inline-flex items-center justify-center hover:text-green-500"
                      >
                        <FaEdit size={18} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Update User Info</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
                        {error && <p className="text-sm italic text-red-500">{error}</p>}
                        {message && <p className={`text-sm italic ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>{message}</p>}

                        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First name" className="border rounded px-2 py-1" />
                        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last name" className="border rounded px-2 py-1" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border rounded px-2 py-1" />
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border rounded px-2 py-1" />
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded px-2 py-1">
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                          <option value="moderator">moderator</option>
                        </select>
                        <button type="submit" disabled={loadingUserUpdate} className="border border-blue-500 text-blue-600 rounded py-1 hover:bg-green-200">
                          {loadingUserUpdate ? "Updating..." : "Update"}
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </td>

                {/* Delete Button */}
                <td className="px-3 py-2 text-center">
                  {loadDelUser === mod._id ? (
                    <span className="text-gray-500">Loading...</span>
                  ) : (
                    <FaTrash onClick={() => deleteUser(mod._id)} className="text-red-500 hover:text-red-300 cursor-pointer" />
                  )}
                </td>
              </>
            )}
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


// min-w-max md:min-w-full w-full border-collapse



