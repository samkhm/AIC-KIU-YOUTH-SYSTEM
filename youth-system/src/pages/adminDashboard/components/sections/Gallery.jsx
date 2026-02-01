import React from 'react'

export default function Gallery() {
  return (
    <div className="border-l-2 rounded m-5 p-5 h-screen flex flex-col animate__animated animate__zoomIn animate__delay-1s">
    {/* Header */}
      <div className="flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Youth Gallery</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition">
          Add
        </button>
      </div>
    </div>
  )
}
