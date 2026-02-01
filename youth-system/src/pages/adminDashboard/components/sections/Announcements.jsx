import React, { useState, useEffect } from 'react'
import Announcement from '../subcomponets/Announcement'
import NewsDialog from '../subcomponets/NewsDialog'
import API from '@/service/api'
import Spinner from '@/components/Spinner'

export default function Announcements() {
  const [news, setNews] = useState([])
  const [loadingFetch, setLoadingFetch] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [delLoader, setDelLoader] = useState(null)

  const fetchNews = async () => {
    setLoadingFetch(true)
    try {
      const res = await API.get('/tasks/getAnnouncements')
      setNews(res.data?.announcements)
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load announcements"
      setMessage(msg)
      setMessageType("error")
    } finally {
      setLoadingFetch(false)
    }
  }

  const createNews = async (payload) => {
    setLoadingCreate(true)
    try {
      const res = await API.post('/tasks/createAnnouncement', payload)

      // add new item without losing old ones
      setNews(prev => [res.data.announcement, ...prev])

      setMessage("Announcement created successfully")
      setMessageType("success")

      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 3000)

    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create announcement"
      setMessage(msg)
      setMessageType("error")
    } finally {
      setLoadingCreate(false)
    }
  }

  const deleteNews = async (id) => {
    if (!id) return
    setDelLoader(id)
    try {
      await API.delete(`/tasks/deleteAnnouncement/${id}`)
      setNews(prev => prev.filter(n => n._id !== id))

    } finally {
      setDelLoader(null)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <div className='border-l-2 rounded p-5 m-5 min-h-screen flex flex-col animate__animated animate__zoomIn animate__delay-1s'>
      <div className='flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10'>
        <h3 className='text-xl border-b-2 border-gray-400 p-2 rounded'>
          Announcements
        </h3>

        <div className='absolute right-8'>
          <button className='p-1'>
            <NewsDialog
              createNews={createNews}
              setMessage={setMessage}
              message={message}
              setMessageType={setMessageType}
              messageType={messageType}
              loadingNews={loadingCreate}

            />
          </button>
        </div>
      </div>

      <div className=' flex flex-wrap items-start bg-gray-200 justify-center
        p-5 gap-5 overflow-y-auto scrollbar-thin
        scrollbar-thumb-gray-400 scrollbar-track-gray-200 
        animate__animated animate__zoomIn animate__delay-2s'>

        {loadingFetch ? (
          <Spinner/>
        ) : news.length === 0 ? (
          <div>No Announcements</div>
        ) : (
          news.map(n => (
            <Announcement
              key={n._id}
              news={n}
              delLoader={delLoader}
              deleteNews={deleteNews}
              setNews={setNews}
            />
          ))
        )}
      </div>
    </div>
  )
}
