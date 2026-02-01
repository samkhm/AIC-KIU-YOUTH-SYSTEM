import React from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import Footer from '../../components/Footer'
import { useState } from 'react'
import API from '@/service/api'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function adminBoard() {

  const [activeSection, setActiveSection] = useState('home')

  const [users, setUsers] = useState([]);
  const [allUsersCount, setAllUsersCount] = useState(null)
  const [loadingUser, setLoadingUsers] = useState(false)
  const [errorLoadingUser, setErrorLoadingUser] = useState("")
  const [loadingUserUpdate, setLoadingUserUpdate] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("");
  const [loadDelUser, setLoadDelUser] = useState(null)


  const loadUsers = async () => {
    setLoadingUsers(true)
    try {
      const res = await API.get('/tasks/getUsers')
      const users = res.data?.users || [];

      setUsers(users);
      setAllUsersCount(users.length);

    } catch (error) {
      const message = error.response?.data?.message;
      setErrorLoadingUser(message);
    } finally {
      setLoadingUsers(false)
    }
  }

  const updateUser = async (id, payload) => {
    setLoadingUserUpdate(true)
    try {
      const res = await API.put(`/tasks/updateUserInfo/${id}`, payload)
      const updatedUser = res.data.updatedUser || res.data
      setUsers(prev =>
        prev.map(u => u._id === id ? { ...u, ...updatedUser } : u)
      )
      setMessage("User updated successfully")
      setMessageType("success")
    } catch (e) {
      setMessage("Update failed")
      setMessageType("error")
    } finally {
      setLoadingUserUpdate(false)
    }
  }

  const deleteUser = async (id) => {
    if (!id) return
    if (!window.confirm("Are you sure?")) return

    setLoadDelUser(id)
    try {
      await API.delete(`/tasks/deleteUser/${id}`)
      setUsers(prev => prev.filter(u => u._id !== id))
    } finally {
      setLoadDelUser(null)
    }
  }




  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage(null)
      setMessageType("")
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])


  return (
    <div className='flex flex-col min-h-screen max-w-screen animate__animated animate__zoomIn animate__delay-1s'>

      <Navbar />
      <div className='flex flex-row flex-1 min-h-0'>
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <Main activeSection={activeSection} users={users} allUsersCount={allUsersCount}
          loadingUser={loadingUser} errorLoadingUser={errorLoadingUser} updateUser={updateUser} loadingUserUpdate={loadingUserUpdate}
          message={message} messageType={messageType} deleteUser={deleteUser} loadDelUser={loadDelUser} />
      </div>

      <Footer />
    </div>
  )
}
