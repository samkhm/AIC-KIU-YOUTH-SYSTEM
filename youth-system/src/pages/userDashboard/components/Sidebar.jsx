import React, { useState } from "react"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"
import {
  IoHomeOutline,
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoCashOutline,
  IoImageOutline,
  IoPerson,
  IoMenu
} from "react-icons/io5"

export default function Sidebar({ activeSection, setActiveSection }) {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { id: "home", name: "Home", icon: <IoHomeOutline /> },
    { id: "announcements", name: "News", icon: <IoAlertCircleOutline /> },
    { id: "events", name: "Events", icon: <IoCalendarOutline /> },
    { id: "projects", name: "Projects", icon: <IoDocumentTextOutline /> },
    { id: "gallery", name: "Gallery", icon: <IoImageOutline /> },
    { id: "profile", name: "Profile", icon: <IoPerson /> },
  ]

  return (
    <>
      {/* Open Button (Mobile & Tablet) */}
      {!open && (
         <IoMenu
         size={22}
           onClick={() => setOpen(true)}
           className="fixed top-20 left-3 z-50 cursor-pointer lg:hidden border-2 border-blue-600 rounded"
          />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 max-h-full bg-blue-400 p-3 z-40
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:transform-none
        `}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end mb-4 lg:hidden">
          <FaArrowAltCircleLeft
            size={22}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setOpen(false)
              }}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition
                hover:bg-gray-300
                ${activeSection === item.id ? "bg-gray-200" : ""}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
