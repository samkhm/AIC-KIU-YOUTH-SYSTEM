import React from 'react'
import AnnouncementItem from '../subsections/AnnouncementItem'
import { useState } from 'react'
import { useEffect } from 'react'
import API from '@/service/api'
import Spinner from '@/components/Spinner'

export default function Announcements() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
 

  const fetchNews = async () => {
    setLoading(true)
    try {
      const res = await API.get('/tasks/getAnnouncements')
      setNews(res.data?.announcements)
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchNews()
  }, [])

  

  return (
    <div className='p-5 animate__animated animate__zoomIn animate__delay-1s'>
      <div className='p-5 gap-5 border-l-3 rounded-t border-gray-500 border-t-1 flex flex-col items-center justify-center '>
        <h3 className='border-b border-blue-200 p-2 w-1/2 flex justify-center'>Announcements</h3>
        <div className='p-3 flex flex-1 w-full items-center gap-5 flex-wrap animate__animated animate__zoomIn animate__delay-2s'>
          {
            loading ? (
              <Spinner/>
            ) : news.length === 0 ? (
              <p>No announcements. Check later</p>
            ) : (
              news.map((an) => (
                <AnnouncementItem
              key={an._id}
              announcement={an}
              />
              ))
            )
          }
       
        </div>
      </div>
    </div>
  )
}
