import BibleStory from '@/pages/adminDashboard/components/subcomponets/BibleStory'
import React from 'react'

export default function Home() {
  return (
    <div className='flex flex-1 p-3 flex-col flex-wrap gap-5'>
      <div className='flex flex-1 border-l-2 border-t-2 border-blue-500 p-5 rounded'>
        <h4 className='border-b-3 text-blue-500 p-2 h-fit w-full flex items-center justify-center'>My progress</h4>
        
      </div>
      <div className='flex flex-1 flex-col gap-5 items-center justify-center border-l-2 border-t-2 border-blue-500 p-5 rounded'>
        <p className='flex p-2 italic text-gray-400 border-b w-full items-center justify-center'>Read a bible story and be blessed</p>
        <BibleStory/>
      </div>
    </div>
  )
}
