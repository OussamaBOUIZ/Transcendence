import React from 'react'
import ChatList from './ChatList';
import ChatOverview from './ChatOverview';
import ChatInput from './ChatInput';
import ChatMain from './ChatMain';
import ChatAccount from './ChatAccount';
import ChatInfo from './ChatInfo';
import "../../scss/chat.scss"
import InboxRooms from './InboxRooms';
import OnlineNow from './OnlineNow';
import {Outlet, Routes, Route, NavLink, useLocation} from 'react-router-dom'

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
