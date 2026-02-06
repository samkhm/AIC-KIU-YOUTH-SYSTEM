import React, { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoCashOutline,
  IoImageOutline,
  IoPerson,
  IoMenu,
  IoBook,
} from "react-icons/io5";

export default function Sidebar({ activeSection, setActiveSection }) {
  const [open, setOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  
 

  const menuItems = [
    { id: "home", name: "Home", icon: <IoHomeOutline /> },
    { id: "users", name: "Users", icon: <IoPeopleOutline /> },
    { id: "announcements", name: "News", icon: <IoAlertCircleOutline /> },
    { id: "events", name: "Events", icon: <IoCalendarOutline /> },
    { id: "projects", name: "Projects", icon: <IoDocumentTextOutline /> },
    //this is adrop down
    {
      name : "Finance",
      icon: <IoCashOutline />,
      children : [
        { id: "pay", name: "My Pay", icon: <IoCashOutline /> },
        { id: "finance", name: "Finance", icon: <IoCashOutline /> }
      ],
    },
    //this is a drop down menu
    {
      name: "Media",
      icon: <IoImageOutline />,
      children: [
        { id: "gallery", name: "Gallery", icon: <IoImageOutline /> },
        { id: "library", name: "Library", icon: <IoBook /> },
      ],
    },

    { id: "profile", name: "Profile", icon: <IoPerson /> },
  ];

  return (
    <>
      {/* Open Button (Mobile & Tablet) */}
      {!open && (
        <label
        onClick={() => setOpen(true)}
        className="fixed top-20 left-3 z-50 cursor-pointer lg:hidden 
        border-2 border-white rounded bg-green-500 text-white p-1 bold
        animate__animated animate__tada animate__infinite animate__slower"
        >Menu</label>
        
      )}

      {/* Sidebar */}
      <aside
        className={`
          animate__animated animate__zoomIn animate__delay-1s
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
            // DROPDOWN ITEM
            if (item.children) {

              const isOpen = openDropdowns[item.name];

              return (
                <div key={item.name}>
                  <div
                    onClick={() => toggleDropdown(item.name)}
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
                          className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-200
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

            // NORMAL ITEM
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition
          animate__animated animate__zoomIn animate__delay-2s
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
