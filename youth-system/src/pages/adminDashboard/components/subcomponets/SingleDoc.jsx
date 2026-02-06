import React, { useState } from "react";
import { FaEdit, FaTrash, FaDownload, FaSave, FaTimes } from "react-icons/fa";
import API from "@/service/api";
import { TailSpin } from 'react-loader-spinner';

export default function SingleDoc({ file, setFiles }) {
  const [mode, setMode] = useState("view");
  const [title, setTitle] = useState(file.title);
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadDel, setLoadDel] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ---------------- Delete ----------------
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    setLoadDel(file._id);
    try {
      await API.delete(`/tasks/deleteLibrary/${file._id}`);
      setFiles(prev => prev.filter(f => f._id !== file._id));
      setMessage("Deleted successfully");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete");
      setMessageType("error");
    } finally {
      setLoadDel(null);
    }
  };

  // ---------------- Save ----------------
  const handleSave = async () => {
    if (!title.trim()) {
      setMessage("Title is required");
      setMessageType("error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    if (newFile) formData.append("file", newFile);

    try {
      const res = await API.put(`/tasks/updateLibrary/${file._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFiles(prev => prev.map(f => (f._id === file._id ? res.data.file : f)));
      setMode("view");
      setMessage("Updated successfully");
      setMessageType("success");
      setNewFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="border p-4 rounded shadow mb-3 flex flex-col gap-3">
      {message && (
        <p className={`text-sm italic ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {mode === "view" ? (
        <>
          <p className="text-sm text-gray-600"><strong>Title:</strong> {file.title}</p>
          <p className="text-sm text-gray-600"><strong>Size:</strong> {(file.file.size / 1024).toFixed(2)} KB</p>

          <div className="flex justify-end gap-2 pt-2">
            {/* Open / Download */}
            <a
              href={file.file.url} // public Cloudinary URL
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-500 flex items-center gap-1"
            >
              <FaDownload /> Open / Download
            </a>

            {/* Delete */}
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
              onClick={handleDelete}
              disabled={loading}
            >
              {loadDel === file._id ? <TailSpin height={18} width={18} color="white"/> : <FaTrash />}
            </button>

            {/* Edit */}
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 flex items-center gap-1"
              onClick={() => setMode("edit")}
            >
              <FaEdit /> Edit
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Edit title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Replace file */}
          <div>
            <label className="text-sm font-medium text-gray-700">Replace File</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600"
            />
          </div>

          {/* Edit actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <TailSpin height={18} width={18}/> : <span className="flex items-center gap-1"><FaSave /> Save</span>}
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 flex items-center gap-1"
              onClick={() => setMode("view")}
              disabled={loading}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
