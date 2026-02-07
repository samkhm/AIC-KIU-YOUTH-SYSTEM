import React, { useState, useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import DailyVerse from "./subcomponets/DailyVerse";
import { getFirstName } from "@/utils/auth";

export default function Navbar() {
  const firstName = getFirstName();
  const [showConfirm, setShowConfirm] = useState(false);

  // Centralized logout function
  const logOut = () => {
    // Remove token
    localStorage.removeItem("token");
    // Trigger logout in other tabs
    localStorage.setItem("logout", Date.now());
    // Close modal and redirect
    setShowConfirm(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    // Listen for logout events in other tabs
    const handleStorage = (event) => {
      if (event.key === "logout") {
        // Another tab logged out → close modal and redirect
        setShowConfirm(false);
        window.location.href = "/login";
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <div
      className="bg-blue-400/80 p-4 flex items-center justify-between relative 
    "
    >
      {/* Admin Name */}
      <p
        className="text-white text-2xl font-bold       
      animate__animated animate__headShake animate__infinite animate__slower      
      "
      >
        Admin {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
      </p>

      {/* Daily Verse */}
      <div
        className="flex items-center justify-center bg-white/20 px-4 py-2 
      rounded shadow-inner hidden sm:block animate__animated animate__zoomIn animate__delay-2s"
      >
        <DailyVerse />
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 bg-white/20 hover:bg-red-500 transition-colors duration-200 text-red-500 hover:text-white font-semibold px-4 py-2 rounded-lg shadow-md"
      >
        <IoLogOutOutline size={20} className="hidden sm:block" />
        <span>Logout</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={logOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
