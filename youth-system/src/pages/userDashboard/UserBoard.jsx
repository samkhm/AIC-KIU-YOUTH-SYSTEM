import React from 'react'
import Navbar from './components/Navbar'
import Footer from '@/components/Footer'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { useState } from 'react'

export default function UserBoard() {
  const [activeSection, setActiveSection] = useState('home')
  return (
    <div className='flex flex-col min-h-screen max-w-screen'>
      <Navbar/>
      <div className='flex flex-row flex-1 min-h-0'>
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection}/>
        <Main activeSection={activeSection}/>
      </div>      
      <Footer/>
    </div>
  )
}
