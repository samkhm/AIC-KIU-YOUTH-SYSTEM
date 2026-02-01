import React, { useEffect, useState } from 'react'
import API from '@/service/api'
import EventItem from '../subsections/EventItem'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await API.get('/tasks/getEvents')
      setEvents(res.data?.events || [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="p-5 animate__animated animate__zoomIn animate__delay-1s">
      <div className="p-5 gap-5 border-l-2 border-t rounded-t border-gray-500 flex flex-col items-center">
        <h3 className="border-b border-blue-200 p-2 w-1/2 text-center">
          Events
        </h3>

        <div className="p-3 w-full flex gap-5 flex-wrap animate__animated animate__zoomIn animate__delay-2s">
          {loading && <p>Loading events...</p>}

          {!loading && events.length === 0 && (
            <p>No events. Check later</p>
          )}

          {!loading &&
            events.map((ev) => (
              <EventItem
                key={ev._id}
                event={ev}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
