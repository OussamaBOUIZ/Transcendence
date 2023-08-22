import React from 'react'
import ChatAccount from './ChatAccount';
import "../../scss/chat.scss"
import OnlineNow from './OnlineNow';
import {Outlet, NavLink} from 'react-router-dom'

export default function ChatLayout () {
    
    return (
        <div className="chat_container">
            <ChatAccount />
            <div className="chat_nav">
                 <OnlineNow />
                    <nav className='flex justify-between'>
                        <NavLink  
                        className={`nav_link ${(isActive:boolean) => isActive ? 'active' : ''}`} 
                        to="/chat" end>
                            Messages
                            <span></span>
                        </NavLink>
                        <NavLink 
                        className={`nav_link ${(isActive:boolean) => isActive ? 'active' : ''}`}  
                        to="/chat/rooms">
                            Channels
                        </NavLink>
                    </nav>
            </div>
            <Outlet />
        </div>
    );
}