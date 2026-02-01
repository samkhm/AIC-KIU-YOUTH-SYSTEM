import React from 'react'

export default function Mycontributions({ contributions = [], projectId }) {
  // Filter contributions for this project
  const projectContributions = contributions.filter(
    (c) => c.projectId === projectId
  )

  if (!projectContributions.length) {
    return <p className="text-sm text-gray-500">No contributions yet.</p>
  }

  const statusColors = {
    pending: 'text-yellow-600',     // yellow for pending
    completed: 'text-green-600',    // green for completed
    failed: 'text-red-600',         // red for failed
  };

  const totalAmount = projectContributions.reduce(
    (sum, c) => 
      c.status === "completed"
    ?  sum + (c.amount || 0) :sum,
    0
  );

  return (
    <>    
  <div className="w-full max-w-full min-w-0 flex">
    <div className="w-full max-w-full max-h-64 overflow-x-auto overflow-y-auto flex items-center justify-center">
      <div className="max-w-full w-64">
        
      <table className="text-sm text-gray-700">
    <thead className="bg-gray-100 sticky top-0 z-10">
      <tr>
        <th className="px-4 py-2 border-b text-left">No.</th>
        <th className="px-4 py-2 border-b text-left">Date</th>
        <th className="px-4 py-2 border-b text-left">Amount</th>
        <th className="px-4 py-2 border-b text-left">Status</th>
      </tr>
    </thead>
    <tbody>
      {projectContributions.map((c, index) => (
        <tr key={c._id || index} className="text-center">
          <td className="px-2 py-1 border-b text-sm">{index + 1}</td>
          <td className="px-2 py-1 border-b text-sm">
            {c.createdAt
              ? new Date(c.createdAt).toLocaleDateString('en-GB')
              : '-'}
          </td>
          <td className="px-2 py-1 border-b text-sm">{c.amount}</td>
          <td
            className={`px-2 py-1 border-b text-sm font-semibold ${
              statusColors[c.status] || 'text-gray-500'
            }`}
          >
            {c.status}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
</div>

<div className="flex justify-between items-center p-2 border-b">
  <label className="font-semibold">Total:</label>
  <span className="text-green-600 font-bold">{totalAmount} KES</span>
</div>


    </>


  )
}
