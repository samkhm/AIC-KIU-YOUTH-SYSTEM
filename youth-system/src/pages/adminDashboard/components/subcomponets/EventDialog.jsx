import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose
} from '@/components/ui/dialog'
import API from '@/service/api'
import React, { useState, useEffect } from 'react'
import { FaAd } from 'react-icons/fa'

export default function EventDialog({ setEvents }) {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("")
    const [loadingCreate, setLoadingCreate] = useState(false)

    const clearMessages = () => {
        setMessage("")
        setMessageType("")
    }

    // Auto-clear messages after 3 seconds
    useEffect(() => {
        if (!message) return

        const timer = setTimeout(() => {
            clearMessages()
        }, 3000)

        return () => clearTimeout(timer)
    }, [message])


    const createEvent = async (payload) => {
        setLoadingCreate(true)
        try {
            const res = await API.post('/tasks/createEvent', payload)

            setEvents(prev => [res.data.event, ...prev])

            const msg = res.data?.response?.message || "Event saved successfully"
            setMessage(msg)
            setMessageType("success")
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to save event"
            setMessage(msg)
            setMessageType("error")
        } finally {
            setLoadingCreate(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        clearMessages()

        if (!title.trim() || !date.trim() || !content.trim()) {
            setMessage("All inputs are required!")
            setMessageType("error")
            return
        }

        const payload = { title, date, content }
        await createEvent(payload)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center justify-center border-2 border-blue-500 rounded-full p-3 hover:border-green-500 transition-colors shadow-md">
                    <FaAd className="text-3xl text-blue-500 hover:text-green-500 transition-colors" />
                </button>
            </DialogTrigger>

            <DialogContent className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-2xl p-8 space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Add Event
                    </DialogTitle>
                </DialogHeader>

                {message && (
                    <p
                        className={`text-sm italic ${messageType === "success"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label className="text-lg font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="text-lg font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <label className="text-lg font-medium text-gray-700">
                        Event message
                    </label>
                    <textarea
                        rows={6}
                        className="border-2 border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter event details here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="submit"
                            disabled={loadingCreate}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
                        >
                            {loadingCreate ? "Saving..." : "Save"}
                        </button>

                        <DialogClose className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                            Close
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
