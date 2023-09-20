
import React, { useContext } from 'react'
import ChatAccount from './ChatAccount';
import "../../scss/chat.scss"
import OnlineNow from './OnlineNow';
import {Outlet, NavLink, useLocation} from 'react-router-dom'
import InboxContext, { InboxProvider } from '../../Context/InboxContext';
import UserContext from '../../Context/UserContext';

function Navi () {
    const {inboxList} = useContext(InboxContext);
    const counter = inboxList.current.reduce((accum, current) => accum += current.unseenMessages ? current.unseenMessages : 0, 0)
    const chatRegex = /^\/chat(\/)?(\d+)?$/;
    const {pathname} = useLocation();
    
    return (
        <nav className='flex justify-between'>
            <NavLink to="/chat"
            className={`nav_link flex justify-center items-center ${chatRegex.test(pathname) ? 'active' : 'disactive'}`}>
                Messages
                {counter !== 0 && <span className=' rounded-lg block bg-pink-500 px-2 h-5 text-sm'>{counter}</span>}
            </NavLink>
            <NavLink to="/chat/rooms"
            className={`nav_link flex justify-center items-center ${!chatRegex.test(pathname) ? 'active' : 'disactive'}`}>
                Channels
            </NavLink>
        </nav>
    )
}

export default function ChatLayout () {

    const {show} = useContext(UserContext)

    return (
        <InboxProvider>
            <div className="chat_container ml-0 smt:ml-4">
                <ChatAccount />
                <div className={`chat_nav ${show === 'inbox' ? 'on' : 'off'}`}>
                    <OnlineNow />
                    <Navi />
                </div>
                <Outlet />
            </div>
        </InboxProvider>
    );
}