import React from 'react'
import Project from '../subcomponets/Project'
import ProjectDialog from '../subcomponets/ProjectDialog'
import { useState } from 'react'
import API from '@/service/api'
import { useEffect } from 'react'

export default function Projects() {

  const [projects, setProjects] = useState([])
  const [loadPj, setLoadPj] = useState(false)

  const fetchProjects = async () => {
    setLoadPj(true)
    try {
      const res = await API.get('/tasks/getProjects')
      setProjects(res.data?.projects)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadPj(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])


  return (
    <div className="border-l-2 rounded m-5 p-5 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Projects</h3>
        <div className='absolute right-8'>
          <ProjectDialog setProjects={setProjects} />
        </div>
      </div>

      {/* Scrollable project list */}
      <div className="flex-1 flex flex-row flex-wrap justify-center items-start gap-5 p-5 bg-gray-200 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {/* Multiple Project components */}
        {
          loadPj ? (
            <div>Loading projects...</div>
          ) : projects.length === 0 ? (
            <div>No projects saved</div>
          ) : (
            projects.map(p => (
              <Project
                key={p._id}
                project={p}
                setProjects={setProjects} />
            ))
          )
        }

        {/* Add more Projects as needed */}
      </div>
    </div>
  )
}
