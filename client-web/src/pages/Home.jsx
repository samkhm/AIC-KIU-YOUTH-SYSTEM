import React from "react";
import Navbar from "@/pages/home_components/Navbar";
import Verse from "./home_components/Verse";
import Announcements from "./home_components/Announcements";
import Events from "./home_components/Events";
import Footer from "./home_components/Footer";
import BgImg from "@/images/bg.jpg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
         {/* Navbar */}
         <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />            
          </div>
      {/* Hero Section */}
      <section
      id="home"
        className="relative w-full h-screen bg-cover bg-center pt-16 md:pt-20 scroll-mt-16"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-500/50 backdrop-blur-md flex flex-col">                  

          {/* Center Hero Content */}
          <div className="flex flex-[3] items-center justify-center relative px-4">
            {/* Verse */}
            <div className="absolute left-6 top-6 md:left-10 md:top-10">
              <Verse />
            </div>

            {/* Title */}
            <div className="text-center text-white space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold">
                Africa Inland Church Kiu
              </h2>
              <h1 className="text-3xl md:text-4xl font-semibold">Youth</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section
        id="announcements"
        className="bg-blue-500 flex flex-col items-center justify-center py-8 px-4 md:px-16 rounded-t-3xl m-5"
      >
        <h4 className="text-2xl md:text-3xl text-white font-semibold border-b border-white mb-6">
          Announcements
        </h4>

        {/* Responsive Grid */}
        <div className="flex flex-wrap gap-5 items-center justify-center">
          <Announcements />
          <Announcements />
          <Announcements />
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="bg-blue-500 flex flex-col items-center justify-center py-8 px-4 md:px-16 rounded-b-3xl m-5"
      >
        <h4 className="text-2xl md:text-3xl text-white font-semibold border-b border-white mb-6 pb-2">
          Upcoming Events
        </h4>

        {/* Responsive Grid */}
        <div className="flex flex-wrap gap-5 items-center justify-center">
          <Events />
          <Events />
          <Events />
        </div>
      </section>
      <Footer/>
    </div>
  );
}
