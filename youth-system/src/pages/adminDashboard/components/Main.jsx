import React from 'react'
import Home from "../components/sections/Home"
import Users from "../components/sections/Users"
import Announcements from "../components/sections/Announcements"
import Events from "../components/sections/Events"
import Projects from "../components/sections/Projects"
import Finance from "../components/sections/Finance"
import Gallery from "../components/sections/Gallery"
import Profile from '@/pages/userDashboard/components/sections/Profile'
import ProjectsUser from '@/pages/userDashboard/components/sections/Projects'
import Library from './sections/Library'

export default function Main({ activeSection, allUsersCount, users, errorLoadingUser, loadingUser, 
  updateUser, loadingUserUpdate, message, messageType, deleteUser, loadDelUser  }) {
  let content;
  switch(activeSection){
    case 'home':
      content = <div> <Home  allUsersCount={ allUsersCount } users={users}/> </div>
      break;
    case 'announcements':
      content = <div> <Announcements/> </div>
      break;
    case 'events' :
      content = <div> <Events/> </div>
      break;
    case 'projects' :
      content = <div> <Projects/> </div>
      break;
      case 'pay':
        content = <div><ProjectsUser/></div>
        break;
    case 'finance' :
      content = <div> <Finance/> </div>
      break;
    case 'gallery' :
      content = <div> <Gallery/> </div>
      break;   
    case 'library':
      content = <div> <Library/> </div>
      break; 
    case 'users':
      content = <div> <Users users={users} loadingUser={loadingUser} 
      updateUser={updateUser} loadingUserUpdate={loadingUserUpdate} message={message} messageType={messageType}
      deleteUser={deleteUser} loadDelUser={loadDelUser} /> </div>
      break;
    case 'profile':
      content = <div> <Profile/> </div>
      break;
    default:
      content = <div>Select a section from sidebar</div>
  }
  return (
    <div className='flex-1 bg-gray-100'>
      <div>
        {content}
      </div>
    </div>
  )
}
