import React, { useState, useEffect } from "react"
import Box from "../subcomponets/Box"
import { FaTrash, FaEdit } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import API from "@/service/api"
import { TailSpin } from "react-loader-spinner"

export default function EventItem({ event, setEvents }) {
  const [mode, setMode] = useState("view") // view | edit

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [content, setContent] = useState("")
  const [loadingUp, setLoadingUp] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const clearMessages = () => {
    setMessage("")
    setMessageType("")
  }

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(clearMessages, 3000)
    return () => clearTimeout(timer)
  }, [message])

  const openEdit = () => {
    setMode("edit")
    setTitle(event.title || "")
    setDate(
      event.date
        ? new Date(event.date).toISOString().split("T")[0]
        : ""
    )
    setContent(event.content || "")
    clearMessages()
  }

  const updateEvent = async (e) => {
    e.preventDefault()
    setLoadingUp(true)

    try {
      const payload = { title, date, content }
      const res = await API.put(`/tasks/updateEvent/${event._id}`, payload)
      const updated = res.data?.event || payload

      setEvents(prev =>
        prev.map(ev => ev._id === event._id ? { ...ev, ...updated } : ev)
      )

      setMessage("Event updated successfully")
      setMessageType("success")
      setMode("view")
    } catch {
      setMessage("Failed to update event")
      setMessageType("error")
    } finally {
      setLoadingUp(false)
    }
  }

  const deleteEvent = async () => {
    setLoadingDel(true)
    try {
      await API.delete(`/tasks/deleteEvent/${event._id}`)
      setEvents(prev => prev.filter(ev => ev._id !== event._id))
    } catch {
      setMessage("Delete failed")
      setMessageType("error")
    } finally {
      setLoadingDel(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Box className="cursor-pointer">
          <h3 className="font-medium">{event.title}</h3>
          <span className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString("en-GB")}
          </span>
          <p className="text-sm text-gray-400">
            {event.content.length > 50
              ? event.content.slice(0, 50) + "..."
              : event.content}
          </p>
        </Box>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-md">
        {mode === "view" && (
          <>
            <DialogHeader>
              <DialogTitle>{event.title}</DialogTitle>
              <span className="p-1 bg-blue-100 rounded text-center">
                {new Date(event.date).toLocaleDateString("en-GB")}
              </span>
            </DialogHeader>

            <p>{event.content}</p>

            <DialogFooter className="flex justify-center gap-10 items-center">
              
              <button
                onClick={openEdit}
                className="p-3 border rounded-full hover:border-green-500"
              >
                <FaEdit color="green" />
              </button>

              {loadingDel ? (
                <TailSpin height={18} width={18} />
              ) : (
                <FaTrash
                  color="red"
                  className="cursor-pointer"
                  onClick={deleteEvent}
                />
              )}
              
              
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </>
        )}

        {mode === "edit" && (
          <>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>

            {message && (
              <p className={`text-sm ${messageType === "success"
                ? "text-green-500"
                : "text-red-500"}`}>
                {message}
              </p>
            )}

           
            <form onSubmit={updateEvent} className="space-y-4">
            <div className="max-h-64  overflow-y-auto flex flex-col gap-2">             
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <textarea
                rows={5}
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full border p-2 rounded"
              />
          </div>
              <DialogFooter className="flex justify-end gap-3">
                <Button type="submit" disabled={loadingUp}>
                  {loadingUp ? "Updating..." : "Update"}
                </Button>

                <Button variant="outline" onClick={() => setMode("view")}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
            

          </>
        )}
      </DialogContent>
      
    </Dialog>
  )
}
