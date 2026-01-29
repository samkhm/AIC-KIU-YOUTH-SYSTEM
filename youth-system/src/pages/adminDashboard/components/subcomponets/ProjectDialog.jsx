import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import API from '@/service/api'
import React, { useEffect, useState } from 'react'
import { FaAd } from 'react-icons/fa'

export default function ProjectDialog({ setProjects }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [loadCreate, setLoadCreate] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const clearMessages = () => {
    setMessage("")
    setMessageType("")
  }

  /* Auto-clear messages */
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(clearMessages, 3000)
    return () => clearTimeout(timer)
  }, [message])

  /* Cleanup image preview URL */
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  const createProject = async () => {
    setLoadCreate(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("startDate", startDate)
      formData.append("endDate", endDate)
      if (image) formData.append("image", image)

      const res = await API.post("/tasks/createProject", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(percent)
        }
      })

      const newProject = res.data.project
      setProjects(prev => [newProject, ...prev])

      setMessage(res.data?.response?.message || "Project created successfully")
      setMessageType("success")

      // Reset form
      setTitle("")
      setStartDate("")
      setEndDate("")
      setContent("")
      setImage(null)
      setImagePreview(null)
      setUploadProgress(0)
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to create project"
      setMessage(msg)
      setMessageType("error")
    } finally {
      setLoadCreate(false)
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

    if (!startDate.trim() || !endDate.trim()){
      setMessage("Start & end dates required")
      setMessageType("error")
      return
    }

    if (!endDate > startDate){
      setMessage("End date can't be greater than beginning date")
      setMessageType("error")
      retun
    }

    await createProject()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center border-2 border-blue-500 rounded-full p-2
                       hover:border-green-500 transition-colors shadow-md"
        >
          <FaAd className="text-3xl text-blue-500 hover:text-green-500 transition-colors" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
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

          <div className='flex flex-wrap flex-row items-center justify-evenly gap-3'>
                <div className='flex flex-col items-center gap-2'>
                <label className="text-lg font-medium text-gray-700">Begin</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='flex flex-col items-center gap-2'>
                <label className="text-lg font-medium text-gray-700">End</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-lg font-medium text-gray-700">Content</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-lg font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded border"
              />
            </div>
          )}

          {/* Upload Progress */}
          {loadCreate && (
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
              disabled={loadCreate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
            >
              {loadCreate ? "Saving..." : "Save"}
            </button>

            <DialogClose className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              Close
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
