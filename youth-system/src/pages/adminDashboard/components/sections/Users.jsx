import React from 'react'
import Admins from '../subcomponets/Admins'
import RegisteredYouths from '../subcomponets/RegisteredYouths'
import SuperAdmins from '../subcomponets/SuperAdmins'

export default function Users({ users, loadingUser, updateUser, loadingUserUpdate, message,
  messageType, deleteUser, loadDelUser }) {
  return (
    <div className="border-l-2 rounded p-4 m-2 md:m-5 flex flex-col flex-1 min-h-0 animate__animated animate__zoomIn animate__delay-1s">

{/* <div className="border-l-2 rounded p-4 m-2 md:m-5 min-h-screen flex flex-col"> */}

  {/* Header */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
    <h3 className="text-xl font-bold border-b-3 rounded p-2">System Users</h3>
  </div>

  {/* User Groups */}
  {/* <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-5 mt-4 w-full"> */}
  <div
  className="flex flex-col flex-wrap justify-start items-start gap-5 p-5 
  bg-gray-200 overflow-y-auto overflow-x-hidden min-h-0 w-full
  animate__animated animate__zoomIn animate__delay-2s
  "
>

    {/* Super Admins */}
      


        
          <SuperAdmins
            users={users}
            loadingUser={loadingUser}
            loadingUserUpdate={loadingUserUpdate}
            updateUser={updateUser}
            message={message}
            messageType={messageType}
            deleteUser={deleteUser}
          />
        

     

    {/* Admins */}
   

     
        <Admins
          users={users}
          loadingUser={loadingUser}
          loadingUserUpdate={loadingUserUpdate}
          updateUser={updateUser}
          message={message}
          messageType={messageType}
          deleteUser={deleteUser}
        />
      

    

    {/* Registered Youths */}
   

     
        <RegisteredYouths
          users={users}
          loadingUser={loadingUser}
          loadingUserUpdate={loadingUserUpdate}
          updateUser={updateUser}
          message={message}
          messageType={messageType}
          deleteUser={deleteUser}
          loadDelUser={loadDelUser}
        />
     

    
  </div>
  
  
</div>

  )
}
