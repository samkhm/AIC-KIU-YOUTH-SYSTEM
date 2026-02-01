import React from 'react'

export default function Footer() {
  const date = new Date();
  return (
    <div className='bg-blue-400 p-4 flex items-center justify-center
    animate__animated animate__zoomIn animate__delay-1s'>
       <p className='text-sm italic text-gray-200 animate__animated animate__zoomIn animate__delay-2s'> &copy; Copyright AIC Kiu Youth {date.getFullYear()}</p>
    </div>
  )
}
