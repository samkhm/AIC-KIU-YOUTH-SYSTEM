import React, { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  IoHomeOutline,
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoImageOutline,
  IoPerson,
  IoBook,
} from "react-icons/io5";

export default function Sidebar({ activeSection, setActiveSection }) {
  const [open, setOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const menuItems = [
    { id: "home", name: "Home", icon: <IoHomeOutline /> },
    { id: "announcements", name: "News", icon: <IoAlertCircleOutline /> },
    { id: "events", name: "Events", icon: <IoCalendarOutline /> },
    { id: "projects", name: "Projects", icon: <IoDocumentTextOutline /> },
    {
      id: "media",
      name: "Media",
      icon: <IoImageOutline />,
      children: [
        { id: "gallery", name: "Gallery", icon: <IoImageOutline /> },
        { id: "library", name: "Library", icon: <IoBook /> },
      ],
    },
    { id: "profile", name: "Profile", icon: <IoPerson /> },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* Open Button (Mobile & Tablet) */}
      {!open && (
        <span
          onClick={() => setOpen(true)}
          className="fixed top-20 left-3 z-50 cursor-pointer bg-green-500 text-white font-bold p-1
           lg:hidden border-2 border-white rounded
           animate__animated animate__tada animate__infinite animate__slower"
        >
          Menu
        </span>
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

        <div className="flex flex-col gap-2 animate__animated animate__zoomIn animate__delay-2s">
          {menuItems.map((item) => {
            // Dropdown parent
            if (item.children) {
              const isOpen = openDropdowns[item.id];

              return (
                <div key={item.id}>
                  <div
                    onClick={() => toggleDropdown(item.id)}
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-300"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>

                  {isOpen && (
                    <div className="ml-6 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <div
                          key={child.id}
                          onClick={() => {
                            setActiveSection(child.id);
                            setOpen(false);
                          }}
                          className={`flex items-center gap-3 p-2 rounded cursor-pointer
                            hover:bg-gray-200
                            ${activeSection === child.id ? "bg-gray-200" : ""}`}
                        >
                          {child.icon}
                          <span>{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Normal item
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition
                  hover:bg-gray-300
                  ${activeSection === item.id ? "bg-gray-200" : ""}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
