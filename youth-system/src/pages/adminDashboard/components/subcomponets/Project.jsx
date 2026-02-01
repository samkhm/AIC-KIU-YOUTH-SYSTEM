import React, { useEffect, useState } from "react"
import Box from "../subcomponets/Box"
import { FaTrash, FaEdit } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import API from "@/service/api"
import { TailSpin } from "react-loader-spinner"

export default function Project({ project, setProjects }) {
  const [mode, setMode] = useState("view") // view | edit

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [loadUp, setLoadUp] = useState(false)
  const [loadDel, setLoadDel] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const clearMessages = () => {
    setMessage("")
    setMessageType("")
  }

  // Auto-clear feedback messages
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(clearMessages, 3000)
    return () => clearTimeout(timer)
  }, [message])

  // Cleanup image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(file)
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  const openEdit = () => {
    setMode("edit")
    setTitle(project.title || "")
    setContent(project.content || "")

    setStartDate(
      project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : ""
    )
    setEndDate(
      project.endDate ? new Date(project.endDate).toISOString().split("T")[0] : ""
    )

    setImage(null)
    setImagePreview(null)
    setUploadProgress(0)
    clearMessages()
  }

  const updateProject = async (id) => {
    setLoadUp(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("startDate", startDate)
      formData.append("endDate", endDate)
      if (image) formData.append("image", image)

      const res = await API.put(`/tasks/updateProject/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(percent)
        }
      })

      const updated = res.data?.project || {
        title,
        content,
        startDate,
        endDate
      }

      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updated } : p))
      )

      setMessage(res.data?.message || "Updated successfully!")
      setMessageType("success")
      setMode("view")

      // reset edit-only states
      setImage(null)
      setImagePreview(null)
      setUploadProgress(0)
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update project"
      setMessage(msg)
      setMessageType("error")
    } finally {
      setLoadUp(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearMessages()

    if (!title.trim() || !content.trim()) {
      setMessage("Title and content are required")
      setMessageType("error")
      return
    }

    if (!startDate || !endDate) {
      setMessage("Start & end dates are required")
      setMessageType("error")
      return
    }

    if (endDate < startDate) {
      setMessage("End date can't be before start date")
      setMessageType("error")
      return
    }

    await updateProject(project._id)
  }

  const deleteProject = async () => {
    setLoadDel(true)
    clearMessages()

    try {
      await API.delete(`/tasks/deleteProject/${project._id}`)
      setProjects((prev) => prev.filter((p) => p._id !== project._id))
      setMessage("Project deleted successfully")
      setMessageType("success")
    } catch (error) {
      const msg = error.response?.data?.message || "Delete failed"
      setMessage(msg)
      setMessageType("error")
    } finally {
      setLoadDel(false)
    }
  }

  const formatDate = (d) => {
    if (!d) return ""
    return new Date(d).toLocaleDateString("en-GB")
  }

  const toggleComplete = async (id, e) =>{
       
   
    const newCompleted = e.target.checked;

    try {
      const res = await API.put(`/tasks/completeProject/${id}`, {
        completed: newCompleted,
      })

      setProjects(prev => prev.map(p => p._id === id ? res.data?.project : p))
      
    } catch (error) {
      console.log("Faled to complete", error)
      
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Box className="cursor-pointer">
          <div className="flex flex-row items-center justify-between p-1">
            <h3 className="font-medium">{project.title}</h3>
            <span
              className={`bg-gray-200 rounded p-2 italic text-sm ${
                project.completed ? "text-green-600" : "text-red-500"
              }`}
            >
              {project.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="w-full h-50">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-sm text-gray-500">
            <strong>Duration:</strong> {formatDate(project.startDate)} to{" "}
            {formatDate(project.endDate)}
          </span>

          <p className="text-sm text-gray-400">
            {project.content?.length > 20
              ? project.content.slice(0, 20) + "..."
              : project.content}
          </p>
        </Box>
      </DialogTrigger>

      <DialogContent className="bg-white">
        {/* VIEW MODE */}
        {mode === "view" && (
          <>
            <DialogHeader>
              <DialogTitle className="border-t-2 rounded mt-5 p-2">
                {project.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col border-l-4 rounded border-blue-500 p-2 gap-2">
              <span className="text-sm text-gray-500">
                <strong>Time frame</strong>
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(project.startDate)} to {formatDate(project.endDate)}
              </span>
            </div>

            <DialogDescription className="space-y-2">
              <div className="w-full h-50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="border-l-4 rounded border-blue-500 p-3">
                {project.content}
              </p>
            </DialogDescription>

            <DialogFooter>
              <div className="flex items-center justify-between p-2 w-full">
                <button
                  type="button"
                  onClick={openEdit}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <FaEdit color="green" />
                </button>

                <input type="checkbox" checked={project.completed} className="w-5 h-5" onChange={(e) => toggleComplete(project._id, e)}/>

                {loadDel ? (
                  <TailSpin height={18} width={18} />
                ) : (
                  <button
                    type="button"
                    onClick={deleteProject}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <FaTrash color="red" />
                  </button>
                )}
              </div>
            </DialogFooter>
          </>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && (
          <>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>

            {message && (
              <p
                className={`text-sm ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-lg font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Dates */}
              <div className="flex flex-wrap flex-row items-center justify-evenly gap-3">
                <div className="flex flex-col items-center gap-2">
                  <label className="text-lg font-medium text-gray-700">Begin</label>
                  <input
                    type="date"
                    className="border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <label className="text-lg font-medium text-gray-700">End</label>
                  <input
                    type="date"
                    className="border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="text-lg font-medium text-gray-700">Content</label>
                <textarea
                rows={2}
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-lg font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-600"
                />
              </div>

              {/* Preview */}
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview</p>
                <img
                  src={imagePreview || project.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded border"
                />
              </div>

              {/* Upload Progress */}
              {loadUp && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploading… {uploadProgress}%
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loadUp}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
                >
                  {loadUp ? "Updating..." : "Update"}
                </button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMode("view")}
                  disabled={loadUp}
                >
                  Cancel
                </Button>
               
              </div>
            </form>
          </>
        )}

        {/* Default Close button */}
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
