import React from "react";
import GalleryDialog from "../subcomponets/GalleryDialog";
import { useState } from "react";
import API from "@/service/api";
import { useEffect } from "react";
import GalleryCard from "../subcomponets/GalleryCard";
import { getUserRole } from "@/utils/auth";


export default function Gallery() {

  const userRole = getUserRole()

  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks/getGalleries");
      setGallery(res.data?.galleries || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="border-l-2 rounded m-5 p-5 h-screen flex flex-col ">
      {/* Header */}

      <div className="flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Youth Gallery🎴</h3>

        {
          (userRole === "admin" || userRole === "moderator") && (
            <GalleryDialog setGallery={setGallery} />
          )
        }


      </div>     

      <div className="p-4 ">
        {loading ? (
          <p>Loading galleries...</p>
        ) : gallery.length === 0 ? (
          <p>No galleries found.</p>
        ) : (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto animate__animated animate__zoomIn animate__delay-1s">
            {gallery.map((g) => (
              <GalleryCard key={g._id} gallery={g} setGallery={setGallery} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
