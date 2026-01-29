import React from 'react'

export default function Footer() {
  const date = new Date();
  return (
    <div className='bg-blue-400 p-4 flex items-center justify-center'>
       <p className='text-sm italic text-gray-200'> &copy; Copyright AIC Kiu Youth {date.getFullYear()}</p>
    </div>
  )
}
