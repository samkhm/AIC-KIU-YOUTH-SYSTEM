import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
  import API from "@/service/api";
  import React, { useEffect, useState } from "react";
  import { FaAd } from "react-icons/fa";
  
  export default function GalleryDialog({ setGallery }) {
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]); // store multiple images
    const [imagePreviews, setImagePreviews] = useState([]); // multiple previews
  
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loadCreate, setLoadCreate] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
  
    const clearMessages = () => {
      setMessage("");
      setMessageType("");
    };
  
    /* Auto-clear messages */
    useEffect(() => {
      if (!message) return;
      const timer = setTimeout(clearMessages, 3000);
      return () => clearTimeout(timer);
    }, [message]);
  
    /* Cleanup image preview URLs */
    useEffect(() => {
      return () => {
        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [imagePreviews]);
  
    /* Handle multiple image selection */
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;
  
      // revoke old previews
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
  
      setImages(files);
      setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };
  
    const createGallery = async () => {
      setLoadCreate(true);
      setUploadProgress(0);
  
      try {
        const formData = new FormData();
        formData.append("title", title);
  
        images.forEach((img) => formData.append("images", img));
  
        const res = await API.post("/tasks/createGallery", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        });
  
        const newGallery = res.data.gallery;
        setGallery((prev) => [newGallery, ...prev]);
  
        setMessage(res.data?.response?.message || "Saved!");
        setMessageType("success");
  
        // Reset form
        setTitle("");
        setImages([]);
        setImagePreviews([]);
        setUploadProgress(0);
      } catch (error) {
        const msg = error.response?.data?.message || "Failed";
        setMessage(msg);
        setMessageType("error");
      } finally {
        setLoadCreate(false);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      clearMessages();
  
      if (!title.trim()) {
        setMessage("Title required");
        setMessageType("error");
        return;
      }
  
      if (!images.length) {
        setMessage("At least one image is required");
        setMessageType("error");
        return;
      }
  
      await createGallery();
    };
  
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
  
        <DialogContent className="bg-white max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Gallery</DialogTitle>
          </DialogHeader>
  
          {message && (
            <p
              className={`text-sm italic ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="flex gap-1">
              <div className="w-full">
                <label className="text-lg font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
  
            {/* Images */}
            <div>
              <label className="text-lg font-medium text-gray-700">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600"
              />
            </div>
  
            {/* Vertical Scrollable Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview</p>
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto p-1 border rounded">
                  {imagePreviews.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-40 object-cover rounded border"
                    />
                  ))}
                </div>
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
    );
  }
  