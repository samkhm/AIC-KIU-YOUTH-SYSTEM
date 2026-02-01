import React from 'react'
import EventItem from '../subcomponets/EventItem'
import { useState } from 'react'
import API from '@/service/api'
import { useEffect } from 'react'
import EventDialog from '../subcomponets/EventDialog'
import Spinner from '@/components/Spinner'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loadEvents, setLoadEvents] = useState(false)

  const fetchEvents = async () => {
    setLoadEvents(true)
    try {

      const res = await API.get('/tasks/getEvents')
      setEvents(res.data.events)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadEvents(false)
    }
  }


  useEffect(() => {
    fetchEvents()
  }, [])


  return (
    <div className='border-l-2 rounded p-5 m-5 flex flex-col h-screen animate__animated animate__zoomIn animate__delay-1s'>

      <div className='flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10'>
        <h3 className='text-xl border-b-3 border-gray-400 p-2 rounded'>Events</h3>
        <div className='absolute right-8'>

          <EventDialog setEvents={setEvents} />

        </div>
      </div>

      <div className=' flex flex-row flex-wrap justify-center items-start bg-gray-200 
      p-5 gap-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
      animate__animated animate__zoomIn animate__delay-2s'>
        {
          loadEvents ? (
            <Spinner/>
          ) : events.length === 0 ? (
            <div>No Events Created</div>
          ) : (events.map((ev) => (
            <EventItem
              key={ev._id}
              event={ev}
              setEvents={setEvents}
            />
          )))
        }


      </div>
    </div>
  )
}
