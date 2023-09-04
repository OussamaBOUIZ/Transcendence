
import React, { useContext } from 'react'
import ChatAccount from './ChatAccount';
import "../../scss/chat.scss"
import OnlineNow from './OnlineNow';
import {Outlet, NavLink} from 'react-router-dom'
import InboxContext, { InboxProvider } from '../../Context/InboxContext';

function Navi () {
    const {inboxList} = useContext(InboxContext);
    const counter = inboxList.reduce((accum, current) => accum += current.unseenMessages ? current.unseenMessages : 0, 0)
    return (
        <nav className='flex justify-between'>
            <NavLink  
            className={`nav_link ${(isActive:boolean) => isActive ? 'active' : ''} flex`} 
            to="/chat" end>
                Messages
                {counter !== 0 && <span className=' rounded-lg block bg-pink-500 px-2 h-5 text-sm'>{counter}</span>}
            </NavLink>
            <NavLink 
            className={`nav_link ${(isActive:boolean) => isActive ? 'active' : ''}`}  
            to="/chat/rooms">
                Channels
            </NavLink>
        </nav>
    )
}

export default function ChatLayout () {
    console.log('ChatLayout render');
    
    return (
        <InboxProvider>
            <div className="chat_container">
                <ChatAccount />
                <div className="chat_nav">
                    <OnlineNow />
                    <Navi />
                </div>
                <Outlet />
            </div>
        </InboxProvider>
    );
}