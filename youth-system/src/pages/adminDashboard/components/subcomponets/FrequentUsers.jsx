import React, { useState, useEffect } from 'react'
import API from '@/service/api'

export default function FrequentUsers() {
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)

  const loadUsers = async () => {
    setLoadingUsers(true)
    try {
      const res = await API.get('/tasks/getUsers')
      const users = res.data?.users || []
      setUsers(users)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingUsers(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const userWithLargeCount = users
    .filter(u => u.count)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
  
    <div className="flex items-center justify-center overflow-auto max-h-64 border border-gray-300 rounded-lg">
    <div className="inline-block min-w-max">
   <table className="table-auto border-collapse text-sm text-gray-700">
     <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-center">No.</th>
              <th className="px-3 py-2 text-center">First Name</th>
              <th className="px-3 py-2 text-center">Last Name</th>
              <th className="px-3 py-2 text-center">Count</th>
              <th className="px-3 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : userWithLargeCount.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No Users
                </td>
              </tr>
            ) : (
              userWithLargeCount.map((u, index) => (
                <tr className="hover:bg-gray-50" key={u._id || index}>
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{u.fname}</td>
                  <td className="px-3 py-2 text-center">{u.lname}</td>
                  <td className="px-3 py-2 text-center font-medium">{u.count}</td>
                  <td
                    className={`px-3 py-2 text-center rounded ${
                      u.status ? 'bg-green-300' : 'bg-red-300'
                    }`}
                  >
                    {u.status ? 'Active' : 'Inactive'}
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
