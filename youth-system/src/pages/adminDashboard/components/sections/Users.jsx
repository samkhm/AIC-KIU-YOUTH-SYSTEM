import React from 'react'
import Admins from '../subcomponets/Admins'
import RegisteredYouths from '../subcomponets/RegisteredYouths'
import SuperAdmins from '../subcomponets/SuperAdmins'

export default function Users({ users, loadingUser, updateUser, loadingUserUpdate, message,
  messageType, deleteUser, loadDelUser }) {
  return (
    <div className='border-l-2 rounded p-5 m-5 min-h-screen flex flex-col'>
      <div className='flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10'>
        <h3 className='text-xl bold border-b-3 rounded p-2'>Sytem Users</h3>
      </div>

      <div className='flex flex-1 flex-row flex-wrap items-center justify-evenly gap-5
          bg-gray-200 
        w-full
        '>

        <div className='border-b p-2'>
          <h4 className='text-md italic'>Super Admins</h4>
          <div className="p-5">
            <SuperAdmins users={users} loadingUser={loadingUser}
              loadingUserUpdate={loadingUserUpdate} updateUser={updateUser} message={message} messageType={messageType}
              deleteUser={deleteUser} />
          </div>

        </div>

        <div className='border-b p-2'>
          <h4 className='text-md italic'>Admins</h4>
          <div className='p-5'>
            <Admins users={users} loadingUser={loadingUser}
              loadingUserUpdate={loadingUserUpdate} updateUser={updateUser} message={message} messageType={messageType}
              deleteUser={deleteUser} />
          </div>
        </div>

        <div className='border-b p-2'>
          <h4 className='text-md italic'>Registered Youths</h4>
          <div className='p-5'>
            <RegisteredYouths users={users} loadingUserUpdate={loadingUserUpdate} loadingUser={loadingUser}
              updateUser={updateUser} message={message} messageType={messageType} deleteUser={deleteUser}
              loadDelUser={loadDelUser} />
          </div>
        </div>
      </div>
    </div>
  )
}
