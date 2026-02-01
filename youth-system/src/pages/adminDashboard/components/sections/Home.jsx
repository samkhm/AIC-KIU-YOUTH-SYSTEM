import React from 'react'
import Item from '../subcomponets/Item'
import FrequentUsers from '../subcomponets/FrequentUsers'
import BibleStory from '../subcomponets/BibleStory'
export default function Home({ allUsersCount, users }) {
  return (
    <div className='p-2 border-l-3 border-gray-400 rounded m-2 animate__animated animate__zoomIn animate__delay-1s'>
      <div className='flex flex-wrap items-center justify-evenly gap-3 border-b-2 border-gray-400 pb-2'>
        <Item allUsersCount={allUsersCount} users={users} />
      </div>
      <div className='flex flex-row items-center flex-wrap gap-5 bg-blue-100 p-5 mt-5 animate__animated animate__zoomIn animate__delay-2s'>
        <div className='flex flex-col items-center w-full'>
          <h4 className='text-xl italic border-b w-fit'>Top 10 frequently system users</h4>
          <div className='flex items-center justify-center flex-1 w-full'>
            <FrequentUsers />
          </div>
        </div>

        <div className='flex flex-col border-l border-gray-400 rounded p-2 animate__animated animate__zoomIn animate__delay-2s'>
          <div className='flex items-center justify-between mr-5 mb-2'>
            <h4 className='text-xl italic border-b w-fit'>Bible Stories</h4>
            <button className='border-2 border-gray-300 text-green-500 rounded text-2xl'><strong>+</strong></button>
          </div>

          <div className='animate__animated animate__zoomIn animate__delay-2s'>
            <BibleStory />
          </div>

        </div>

      </div>
    </div>
  )
}
