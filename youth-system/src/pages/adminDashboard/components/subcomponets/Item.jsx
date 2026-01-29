import React from 'react'
import Box from './Box'

export default function Item({ allUsersCount, users }) {

  const reg_youth_count = users.filter(
    u => u.role?.toLowerCase() === "user"
  ).length;

  const reg_youth_admins = users.filter(
    u => u.role?.toLowerCase() !== "user"
  ).length;
  

   return (
    <>
    <Box>
        <div className="flex flex-col justify-center items-center">
        <h3 className="text-md italic text-gray-400">
         Registered Youths
        </h3>
        <span className="text-sm font-bold">
          {reg_youth_count}
        </span>
      </div>
    </Box>
    <Box>
        <div className="flex flex-col justify-center items-center">
        <h3 className="text-md italic text-gray-400">
          System Admins
        </h3>
        <span className="text-sm font-bold">
          {reg_youth_admins}
        </span>
      </div>
    </Box>
    <Box>
        <div className="flex flex-col justify-center items-center">
        <h3 className="text-md italic text-gray-400">
          System Users
        </h3>
        <span className="text-sm font-bold">
          {allUsersCount}
        </span>
      </div>
    </Box>


    </>
  )
}
