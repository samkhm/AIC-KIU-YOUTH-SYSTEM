import React from 'react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const openMenu = () =>{
    setOpen(prev => !prev)
  }


  return (

    <>
    {/* for pc */}
    <div className='hidden md:flex p-3 items-center gap-5 w-fit absolute right-16'>
      <a href="#home" className='border-b p-1 rounded text-green-400 hover:text-yellow-500 text-bold hover:border-yellow-500 border-b'>Home</a>
      <a href="#announcements" className='border-b p-1 rounded text-green-400 hover:text-yellow-500 text-bold hover:border-yellow-500 border-b'>Announcements</a>
      <a href="#events" className='border-b p-1 rounded text-green-400 hover:text-yellow-500 text-bold hover:border-yellow-500 border-b'>Upcoming Events</a>
      <a href="#projects" className='border-b p-1 rounded text-green-400 hover:text-yellow-500 text-bold hover:border-yellow-500 border-b'>Projects</a>
    </div>


    {/* for mobile */}
    <div className='flex md:hidden p-3 items-center justify-center'>
      <button className='text-green-400 font-bold absolute right-5 top-4' onClick={openMenu}>{open ? "X" : "Menu"}</button>

      {open && (
          <div className="absolute top-10 right-0 mt-2 w-40 bg-white shadow-lg rounded-md flex flex-col">
            <a
              href="#"
              className="p-3 border-b border-gray-200 hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="#"
              className="p-3 border-b border-gray-200 hover:bg-gray-100"
            >
              Announcements
            </a>
            <a
              href="#"
              className="p-3 border-b border-gray-200 hover:bg-gray-100"
            >
              Upcoming Events
            </a>
            <a
              href="#"
              className="p-3 hover:bg-gray-100"
            >
              Projects
            </a>
          </div>
        )}
    </div>

    </>
  )
}
