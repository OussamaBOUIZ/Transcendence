import React, {useState} from 'react'
import ChatList from './ChatList';
import ChatOverview from './ChatOverview';
import ChatInput from './ChatInput';
import ChatAccount from './ChatAccount';
import ChatInfo from './ChatInfo';
import "../../scss/chat.scss"
import Inbox from './Inbox';
import InboxRooms from './InboxRooms';
import OnlineNow from './OnlineNow';
import {Outlet, Routes, Route, Link, useParams} from 'react-router-dom'
import { getUserData } from '../../Hooks/getUserData';
import {User, rooms} from "../../../../global/Interfaces"
import ChatRoom from "./ChatRoom"


function InboxDm () {
    return (
        <h2>DIRECT MESSAGES</h2>
    );
}

function InboxChannels () {
    return (
        <InboxRooms />
    );
}


function InboxLayout () {
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

    const [chat, setChat] = useState<boolean>(false)
    const [room, setRoom] = useState<rooms>({id: 0, channel_name: "", channel_type: ""})
 
    return ((
        <div className="chat_container">
            <ChatAccount />
            <div className="chat_list">
                <OnlineNow />
                <InboxRooms setRoom={setRoom} setChat={setChat}/>
                {chat && <ChatRoom room={room}/>}
                {/* <Routes>
                    <Route element={<InboxLayout /> }>
                        <Route index  path="./*" element={<InboxDm />}/>
                        <Route path="rooms/*" element={<InboxRooms />}/>
                    </Route>
                </Routes> */}
            </div>
            <ChatOverview />
            <Outlet />
        </div>
    ));
}

