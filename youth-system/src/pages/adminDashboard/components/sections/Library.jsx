import React from 'react'
import LibraryDialog from '../subcomponets/LibraryDialog'
import { useState } from 'react'
import API from '@/service/api'
import { useEffect } from 'react'
import SingleDoc from '../subcomponets/SingleDoc'
import { getUserRole } from '@/utils/auth'

export default function Library() {
  const userRole = getUserRole();
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchDocuments = async () =>{
      setLoading(true)
      try {
        const res = await API.get('/tasks/getLibraries')
        setFiles(res.data?.files)        
      } catch (error) {
        console.log(error)        
      } finally{
        setLoading(false)
      }
    }
    useEffect(() => {
      fetchDocuments()
    }, [])
  
    // console.log("Files: ", files)

  return (
    <div className="border-l-2 rounded m-5 p-5 h-screen flex flex-col ">
    {/* Header */}
      <div className="flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Library</h3>
        {
          ( userRole === "admin" || userRole === "moderator") && (
            <LibraryDialog setFiles={setFiles}/>        
          )
        }

      </div>

      <div className='w-full animate__animated animate__zoomIn animate__dalay-1s
      overflow-y-auto scrollbar-hide'>

        {
          loading ? (
            <p>Loading documents...</p>
          ) : files.length == 0 ? (
            <p>No documents added</p>
          ) :
          files.map((f) => (
            <SingleDoc key={f._id} file={f} setFiles={setFiles} />
          ))
        }
        
      </div>
    </div>
  )
}
