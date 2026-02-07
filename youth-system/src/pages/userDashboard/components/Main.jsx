import React from 'react'
import Home from './sections/Home';
import Announcements from './sections/Announcements';
import Events from './sections/Events';
import Projects from './sections/Projects';
import Gallery from '@/pages/adminDashboard/components/sections/Gallery';
import Profile from './sections/Profile';
import Library from '@/pages/adminDashboard/components/sections/Library';


export default function Main({ activeSection }) {
  let content;
  switch(activeSection){
    case 'home':
      content = <div> <Home /> </div>
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
    case 'gallery' :
      content = <div> <Gallery/> </div>
      break;    
    case 'library' :
      content = <div> <Library/> </div>
      break;
    case 'profile':
      content = <div> <Profile /> </div>
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
