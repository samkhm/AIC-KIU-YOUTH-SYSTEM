import React from 'react'

export default function Gallery() {
  return (
    <div className='flex flex-col items-center gap-5 p-5 animate__animated animate__zoomIn animate__delay-1s'>
      <h3 className='p-2 border-b-2 border-green-500 w-3/4 flex items-center justify-center text-green-700 bold mt-5'>Youth Gallery</h3>
      
      <div className='border-l-4 border-purple-500 p-5 rounded-t mt-5 flex items-center justify-center w-full animate__animated animate__zoomIn animate__delay-2s'>
        Images will be uploaded soon
      </div>
    </div>
  )
}
