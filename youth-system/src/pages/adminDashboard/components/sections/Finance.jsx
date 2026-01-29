import API from '@/service/api'
import React, { useEffect, useMemo, useState } from 'react'
import './finance.css'

export default function Finance() {
  const [payments, setPayments] = useState([])
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [loading, setLoading] = useState(false)

  /* ================= FETCH DATA ================= */

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const res = await API.get('/tasks/getPayments')
      setPayments(res.data?.payments || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const res = await API.get('/tasks/getUsers')
      setUsers(res.data?.users || [])
    } catch (err) {
      console.error(err)
    }
  }

  const loadProjects = async () => {
    try {
      const res = await API.get('/tasks/getProjects')
      setProjects(res.data?.projects || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPayments()
    loadUsers()
    loadProjects()
  }, [])

  /* ================= DERIVED DATA ================= */

  // Payments for selected project
  const projectPayments = useMemo(() => {
    if (!selectedProjectId) return []
    return payments.filter(p => p.projectId === selectedProjectId)
  }, [payments, selectedProjectId])

  // Table 1: User totals (ONLY completed)
  const userTotals = useMemo(() => {
    const totalsMap = {}

    projectPayments.forEach(p => {
      if (p.status !== 'completed') return

      if (!totalsMap[p.userId]) {
        totalsMap[p.userId] = 0
      }
      totalsMap[p.userId] += p.amount
    })

    return Object.entries(totalsMap).map(([userId, total]) => {
      const user = users.find(u => u._id === userId)
      return {
        userId,
        fname: user?.fname || '',
        lname: user?.lname || '',
        total
      }
    })
  }, [projectPayments, users])

  const selectedProject = projects.find(p => p._id === selectedProjectId)

  /* ================= PRINT ================= */

  const printSection = (id) => {
    const content = document.getElementById(id).innerHTML
    const original = document.body.innerHTML

    document.body.innerHTML = content
    window.print()
    document.body.innerHTML = original
    window.location.reload()
  }

  /* ================= UI ================= */

  return (
    <div className="border-l-2 rounded m-5 p-5 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Finance</h3>
      </div>

      {/* Project selector */}
      <div className="flex justify-center mt-4">
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="border p-3 w-64 rounded"
        >
          <option value="">Select project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {!selectedProjectId && (
        <p className="text-center mt-6 text-gray-500">
          Select a project to view finance details
        </p>
      )}

      {selectedProjectId && (
        <>
          {/* ===== PRINT BUTTONS ===== */}
          <div className="flex gap-3 mt-4 justify-center">
            <button
              onClick={() => printSection('print-summary')}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Print Summary
            </button>

            <button
              onClick={() => printSection('print-transactions')}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Print Transactions
            </button>
          </div>

          {/* ===== TABLE 1: SUMMARY ===== */}
          <div id="print-summary" className="print-section mt-6">
            <h2 className="print-title">Project Contributions Summary</h2>
            <p className="print-meta">
              Project: {selectedProject?.title} | Date: {new Date().toLocaleDateString()}
            </p>

            <div className="overflow-x-auto border rounded">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th>No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Total Contributed</th>
                  </tr>
                </thead>
                <tbody>
                  {userTotals.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No completed contributions
                      </td>
                    </tr>
                  ) : (
                    userTotals.map((u, index) => (
                      <tr key={u.userId} className="text-center">
                        <td>{index + 1}</td>
                        <td>{u.fname}</td>
                        <td>{u.lname}</td>
                        <td className="font-medium">{u.total}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== TABLE 2: TRANSACTIONS ===== */}
          <div id="print-transactions" className="print-section mt-8">
            <h2 className="print-title">Project Transactions</h2>
            <p className="print-meta">
              Project: {selectedProject?.title} | Date: {new Date().toLocaleDateString()}
            </p>

            <div className="overflow-x-auto border rounded">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th>No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No transactions
                      </td>
                    </tr>
                  ) : (
                    projectPayments.map((p, index) => {
                      const user = users.find(u => u._id === p.userId)
                      return (
                        <tr key={p._id} className="text-center">
                          <td>{index + 1}</td>
                          <td>{user?.fname || 'Unknown'}</td>
                          <td>{user?.lname || ''}</td>
                          <td>{p.amount}</td>
                          <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                          <td>{p.transaction_id || '-'}</td>
                          <td
                            className={`font-medium ${
                              p.status === 'completed'
                                ? 'text-green-600'
                                : 'text-orange-500'
                            }`}
                          >
                            {p.status}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
