import API from '@/service/api'
import React, { useEffect, useMemo, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"


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
  const projectPayments = useMemo(() => {
    if (!selectedProjectId) return []
    return payments.filter(p => p.projectId === selectedProjectId)
  }, [payments, selectedProjectId])

  const userTotals = useMemo(() => {
    const totalsMap = {}
    projectPayments.forEach(p => {
      if (p.status !== 'completed') return
      if (!totalsMap[p.userId]) totalsMap[p.userId] = 0
      totalsMap[p.userId] += p.amount_paid
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

  const completedProjectTotal = useMemo(() => {
    return projectPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount_paid || 0), 0)
  }, [projectPayments])

  const selectedProject = projects.find(p => p._id === selectedProjectId)

  /* ================= PRINT ================= */
  const printSection = (id) => {
    const element = document.getElementById(id)
    if (!element) return
  
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* optional: add your table styles */
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    // no reload here
    printWindow.close()
  }
  

  /* ================= DOWNLOAD PDF (jsPDF + autoTable) ================= */
  const downloadPDF = (type) => {
    const doc = new jsPDF()
    doc.setFontSize(12)
  
    doc.text(
      type === 'summary' ? 'Project Contributions Summary' : 'Project Transactions',
      14,
      20
    )
    doc.text(`Project: ${selectedProject?.title || ''}`, 14, 28)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 36)
    doc.text(
      `Total Completed Contributions: ${completedProjectTotal.toLocaleString()} KES`,
      14,
      40
    )
    
  
    if (type === 'summary') {
      const tableData = userTotals.map((u, index) => [
        index + 1,
        u.fname,
        u.lname,
        u.total
      ])
  
      autoTable(doc, {
        startY: 48,
        head: [['No.', 'First Name', 'Last Name', 'Total Contributed']],
        body: tableData
      })
  
      doc.save('finance_summary.pdf')
    } else if (type === 'transactions') {
      const tableData = projectPayments.map((p, index) => {
        const user = users.find(u => u._id === p.userId)
        return [
          index + 1,
          user?.fname || 'Unknown',
          user?.lname || '',
          p.amount_paid,
          new Date(p.createdAt).toLocaleDateString(),
          p.transaction_id || '-',
          p.status
        ]
      })
  
      autoTable(doc, {
        startY: 44,
        head: [
          ['No.', 'First Name', 'Last Name', 'Amount', 'Date', 'Transaction ID', 'Status']
        ],
        body: tableData,
        styles: { fontSize: 10 }
      })
  
      doc.save('finance_transactions.pdf')
    }
  }
  

  /* ================= UI ================= */
  return (
    <div className="border-l-2 rounded m-5 p-5 h-screen flex flex-col animate__animated animate__zoomIn animate__delay-1s">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Finance</h3>
      </div>

      {/* Project selector */}
      <div className="flex justify-center mt-4 animate__animated animate__zoomIn animate__delay-2s">
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
        <p className="text-center mt-6 text-gray-500 animate__animated animate__zoomIn animate__delay-2s">
          Select a project to view finance details
        </p>
      )}

      {selectedProjectId && (
        <>
          {/* ===== PRINT & DOWNLOAD BUTTONS ===== */}
          <div className="flex gap-3 mt-4 justify-center flex-wrap animate__animated animate__zoomIn animate__delay-2s">
            {/* Print buttons → desktop/tablet */}
            <button
              onClick={() => printSection('print-summary')}
              className="bg-green-600 text-white px-4 py-2 rounded hidden md:inline-block"
            >
              Print Summary
            </button>

            <button
              onClick={() => printSection('print-transactions')}
              className="bg-blue-600 text-white px-4 py-2 rounded hidden md:inline-block"
            >
              Print Transactions
            </button>

            {/* Download PDF → mobile only */}
            <button
              onClick={() => downloadPDF('summary')}
              className="bg-purple-600 text-white px-4 py-2 rounded md:hidden flex items-center gap-1"
            >
              <FaDownload /> Download Summary PDF
            </button>

            <button
              onClick={() => downloadPDF('transactions')}
              className="bg-purple-600 text-white px-4 py-2 rounded md:hidden flex items-center gap-1"
            >
              <FaDownload /> Download Transactions PDF
            </button>
          </div>

          {/* ===== TABLE 1: SUMMARY ===== */}
          <div
            id="print-summary"
            className="w-full mt-6 overflow-x-auto p-4 flex flex-col border-b-4 animate__animated animate__zoomIn animate__delay-2s"
          >
            <h2>Project Contributions Summary</h2>
            <p>
              Project: {selectedProject?.title} | Date:{' '}
              {new Date().toLocaleDateString()}
            </p>  
            {/* total of the current project */}
            <label className="font-semibold mt-2">
              Total Completed Contributions: {completedProjectTotal.toLocaleString()} KES
            </label>

            <div className="w-full max-w-full min-w-0 flex mt-5">
            <div className="w-full max-w-full max-h-64 overflow-x-auto overflow-y-auto flex items-center">        
            <div className='max-w-full w-64'>            
            <table className="w-full border-collapse mt-2 text-left">
              <thead>
                <tr>
                  <th className="border px-3 py-2 text-center min-w-[20px]">No.</th>
                  <th className="border px-3 py-2 text-center min-w-[120px]">First Name</th>
                  <th className="border px-3 py-2 text-center min-w-[120px]">Last Name</th>
                  <th className="border px-3 py-2 text-center min-w-[120px]">Total Contributed</th>
                </tr>
              </thead>
              <tbody>
                {userTotals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No completed contributions
                    </td>
                  </tr>
                ) : (
                  userTotals.map((u, index) => (
                    <tr key={u.userId}>
                      <td className="border p-2 text-center">{index + 1}</td>
                      <td className="border p-2 text-center">{u.fname}</td>
                      <td className="border p-2 text-center">{u.lname}</td>
                      <td className="border p-2 text-center">{u.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
            </div>
            </div>

          </div>

          {/* ===== TABLE 2: TRANSACTIONS ===== */}
          <div
            id="print-transactions"
            className="w-full mt-8 overflow-x-auto p-4 flex flex-col animate__animated animate__zoomIn animate__delay-2s"
          >
            <h2>Project Transactions</h2>
            <p>
              Project: {selectedProject?.title} | Date:{' '}
              {new Date().toLocaleDateString()}
            </p>
      
            <div className="w-full max-w-full min-w-0 flex mt-5">
            <div className="w-full max-w-full max-h-64 overflow-x-auto overflow-y-auto">
            <div className='max-w-full w-64'>
              <table className="w-full border-collapse mt-2 text-left">
                <thead>
                  <tr>
                    <th className="border px-3 py-2 text-center min-w-[40px]">No.</th>
                    <th className="border px-3 py-2 text-center min-w-[120px]">First Name</th>
                    <th className="border px-3 py-2 text-center min-w-[120px]">Last Name</th>
                    <th className="border px-3 py-2 text-center min-w-[120px]">Amount</th>
                    <th className="border px-3 py-2 text-center min-w-[120px]">Date</th>
                    <th className="border px-3 py-2 text-center min-w-[140px]">Transaction ID</th>
                    <th className="border px-3 py-2 text-center min-w-[120px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-4">
                        No transactions
                      </td>
                    </tr>
                  ) : (
                    projectPayments.map((p, index) => {
                      const user = users.find(u => u._id === p.userId)
                      return (
                        <tr key={p._id}>
                          <td className="border p-2 text-center">{index + 1}</td>
                          <td className="border p-2 text-center">{user?.fname || 'Unknown'}</td>
                          <td className="border p-2 text-center">{user?.lname || ''}</td>
                          <td className="border p-2 text-center">{p.amount_paid}</td>
                          <td className="border p-2 text-center">{new Date(p.createdAt).toLocaleDateString()}</td>
                          <td className="border p-2 text-center">{p.transaction_id || '-'}</td>
                          <td className="border p-2 text-center">{p.status}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </div>

          </div>
        </>
      )}
    </div>
  )
}
