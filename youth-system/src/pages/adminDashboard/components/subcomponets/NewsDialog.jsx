import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { FaAd } from 'react-icons/fa'

export default function NewsDialog({ createNews, message, setMessage, setMessageType, messageType, loadingNews }) {
  const [data, setData] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setMessageType("")

    if (!data.trim()) {
      setError("Announcement is required")
      setTimeout(() => {
        setError("")
      }, 3000)

      return
    }

    const payload = { data }

    try {
      await createNews(payload)
      setData("")
    } catch {
      setError("Failed to create announcement")
    }
  }

  const clearMessages = () => {
    setError("")
    setMessage("")
    setMessageType("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='flex items-center justify-center border-2 border-blue-500 rounded-full p-3 hover:border-green-500 transition-colors'>
          <FaAd className='text-3xl text-blue-500 hover:text-green-500 transition-colors' />
        </button>
      </DialogTrigger>

      <DialogContent className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-700">
            Add Announcement
          </DialogTitle>
        </DialogHeader>

        {error && <p className="text-sm italic text-red-500">{error}</p>}

        {message && (
          <p className={`text-sm italic ${messageType === "success" ? "text-green-500" : "text-red-500"
            }`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <textarea
            rows={6}
            value={data}
            onChange={(e) => {
              setData(e.target.value)
              clearMessages()
            }}
            placeholder="Enter announcement here..."
            className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={loadingNews}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
            >
              {loadingNews ? "Saving..." : "Save"}
            </button>

            <DialogClose className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              Close
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
