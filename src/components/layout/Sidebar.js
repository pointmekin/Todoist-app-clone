import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt,FaRegCalendar } from 'react-icons/fa'
import { useSelectedProjectValue } from '../../contexts';
import { AddProject } from '../AddProject';
import { Projects } from '../Projects';

export const Sidebar = () => {

  const { setSelectedProject } = useSelectedProjectValue()
  const [active, setActive] = useState('inbox')
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          aria-label="Show inbox tasks"
          className={active === 'inbox' ? 'active' : undefined}
          onClick={()=> {
            setActive('inbox')
            setSelectedProject('INBOX')
          }}
          onKeyDown={(e)=> {
            if (e.key === 'Enter') {
              setActive('inbox')
              setSelectedProject('INBOX')
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span><FaInbox /></span>
          <span>Inbox</span>
        </li>
        <li
          data-testid="today"
          aria-label="Show Today's Tasks"
          className={active === 'today' ? 'active' : undefined}
          onClick={()=> {
            setActive('today')
            setSelectedProject('TODAY')
          }}
          onKeyDown={(e)=> {
            if (e.key === 'Enter') {
              setActive('today')
              setSelectedProject('TODAY')
            }
            
          }}
          role="button"
          tabIndex={0}
        >
          <span><FaRegCalendar /></span>
          <span>Today</span>
        </li>
        <li
          data-testid="next_7"
          aria-label="Show Next 7 days tasks"
          className={active === 'next_7' ? 'active' : undefined}
          onClick={()=> {
            setActive('next_7')
            setSelectedProject('NEXT_7')
          }}
          onKeyDown={(e)=> {
            if (e.key === 'Enter') {
              setActive('next_7')
              setSelectedProject('NEXT_7')
            }
            
            
          }}
          role="button"
          tabIndex={0}
          
          
        >
          <span><FaRegCalendarAlt /></span>
          <span>Next 7 days</span>
        </li>
      </ul>

      <div 
        className="sidebar__middle" 
        aria-label="Show/hide label"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {if (e.key === 'Enter') setShowProjects(!showProjects)}}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown className={!showProjects ? 'hidden-projects' : undefined}/>
        </span>
        <h2 className="pb-0">Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects/>}</ul>
      {showProjects && <AddProject/>}
    </div>
  )
}