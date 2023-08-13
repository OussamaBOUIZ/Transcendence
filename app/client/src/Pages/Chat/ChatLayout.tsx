import React from 'react'
import ChatList from './ChatList';
import ChatOverview from './ChatOverview';
import ChatInput from './ChatInput';
import ChatMain from './ChatMain';
import ChatAccount from './ChatAccount';
import ChatInfo from './ChatInfo';
import "../../scss/chat.scss"
import Inbox from './Inbox';
import InboxRooms from './InboxRooms';
import OnlineNow from './OnlineNow';
import {Outlet, Routes, Route, Link, useLocation} from 'react-router-dom'

function InboxDm () {
    return (
        <h2>DIRECT MESSAGES</h2>
    );
}

// function InboxRooms () {
//     return (
//         <h2>ROOMS MESSAGES</h2>
//     );
// }


function InboxLayout () {
    const location = useLocation()
    console.log('---');
    console.log(location.pathname)
    return (
        <div>
            <section className="inbox">
                <nav>
                    <Link  className="block" to="/chat">Messages<span></span></Link>
                    <Link className="block"  to="/chat/rooms">Channels<span></span></Link>
                </nav>
                <Outlet />
            </section>
        </div>
    );
}

export default function ChatLayout () {
    const {pathname} = useLocation()
    console.log(pathname)
    return ((
        <div className="chat_container">
            <ChatAccount />
            <div className="chat_list">
                <OnlineNow />
                <InboxRooms />
            </div>
            <Outlet />
        </div>
    ));
}

