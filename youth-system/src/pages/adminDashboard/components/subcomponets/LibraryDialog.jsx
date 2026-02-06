import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import API from "@/service/api";
import React, { useState } from "react";
import { FaAd } from "react-icons/fa";

export default function LibraryDialog({ setFiles }) {
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("")

  const handleDocChange = (e) => setDoc(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()){
      setMessage("Title is required");
      setMessageType("error");
      return 
    } 
    if (!doc){
      setMessage("Document is required");
      setMessageType("error");
      return 
    } 

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", doc);

    try {
      const res = await API.post("/tasks/createLibrary", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFiles((prev) => [res.data.file, ...prev]);
      setTitle("");
      setDoc(null);
      setMessage("Uploaded successfully");
      setMessageType("success")
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
      setMessageType("error")
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center border-2 border-blue-500 rounded-full p-2 hover:border-green-500">
          <FaAd className="text-3xl text-blue-500 hover:text-green-500" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add Document</DialogTitle>
        </DialogHeader>

        {message && (
          <p className={`text-sm italic ${messageType === "success" ? "text-green-500" : "text-red-500"
            }`}>
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
              onChange={handleDocChange}
              className="block w-full text-sm text-gray-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-500"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            <DialogClose className="px-4 py-2 border rounded hover:bg-gray-100">Close</DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
