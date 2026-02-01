import API from '@/service/api'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ProjectItem from '../subsections/ProjectItem'
import Spinner from '@/components/Spinner'


export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () =>{
    setLoading(true)
    try {
      const res = await API.get('/tasks/getProjects')
      setProjects(res.data?.projects)      
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProjects()
  }, [])
  return (
    <div className="p-5 animate__animated animate__zoomIn animate__delay-1s">
    <div className="p-5 gap-5 border-l-2 border-t rounded-t border-gray-500 flex flex-col items-center">
      <h3 className="border-b border-blue-200 p-2 w-1/2 text-center">
        Events
      </h3>

      <div className="p-3 w-full flex gap-5 flex-wrap animate__animated animate__zoomIn animate__delay-2s">
        {loading && <Spinner />}

        {!loading && projects.length === 0 && (
          <p>No projects. Check later</p>          
        )}

        {!loading &&
          projects.map((p) => (
            <ProjectItem
              key={p._id}
              project={p}
            />
          ))}
      </div>
    </div>
  </div>
  )
}
