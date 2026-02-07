import React, { useState } from "react";
import { FaTrash, FaDownload, FaSpinner } from "react-icons/fa";
import API from "@/service/api";
import { getUserRole } from "@/utils/auth";

export default function GalleryCard({ gallery, setGallery }) {
  const userRole = getUserRole();

  const [deletingImage, setDeletingImage] = useState("");
  const [deletingGallery, setDeletingGallery] = useState("");
  const [downloading, setDownloading] = useState(""); // track image downloading

  const formattedDate = new Date(gallery.createdAt).toLocaleDateString();

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setDeletingImage(imageId);
    try {
      await API.delete(`/tasks/deleteImage/${gallery._id}/image/${imageId}`);
      setGallery((prev) =>
        prev.map((g) =>
          g._id === gallery._id
            ? { ...g, images: g.images.filter((img) => img.id !== imageId) }
            : g
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingImage("");
    }
  };

  const handleDeleteGallery = async () => {
    if (!window.confirm("Are you sure you want to delete this entire gallery?")) return;

    setDeletingGallery(true);
    try {
      await API.delete(`/tasks/deleteGallery/${gallery._id}`);
      setGallery((prev) => prev.filter((g) => g._id !== gallery._id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingGallery(false);
    }
  };

  // **Download image in background**
  const handleDownloadImage = async (img) => {
    setDownloading(img.id);
    try {
      const response = await fetch(img.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // Set a filename using gallery title and image id
      link.download = `${gallery.title}_${img.id}.jpg`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setDownloading("");
    }
  };

  return (
    <div className="border p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-semibold">{gallery.title}</h3>
          <p className="text-sm text-gray-500">Created on: {formattedDate}</p>
        </div>
        {
          ( userRole === "admin" || userRole === "moderator") && (
            <button
            onClick={handleDeleteGallery}
            disabled={deletingGallery}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            {deletingGallery ? "Deleting..." : "Delete Gallery"}
          </button>
          )
        }

       

      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 max-h-96 overflow-y-auto">
        {gallery.images.map((img) => (
          <div key={img.id} className="relative w-40">
            <img
              src={img.url}
              alt={gallery.title}
              className="w-full h-40 object-cover rounded"
            />

            {/* Delete Button */}
            {
              (userRole === "admin" || userRole === "moderator") && (
                <button
              onClick={() => handleDeleteImage(img.id)}
              disabled={deletingImage === img.id}
              className="absolute top-2 right-10 bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              { deletingImage ? <FaSpinner height={15} width={15}/> : <FaTrash />}
              
            </button>
              )
            }
            

            {/* Download Button */}
            <button
              onClick={() => handleDownloadImage(img)}
              disabled={downloading === img.id}
              className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded hover:bg-green-600"
            >
              {downloading === img.id ? "..." : <FaDownload />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
