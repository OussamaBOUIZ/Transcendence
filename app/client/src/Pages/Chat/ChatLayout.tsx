import React from 'react'
import ChatList from './ChatList';
import ChatOverview from './ChatOverview';
import ChatInput from './ChatInput';
import ChatMain from './ChatMain';
import ChatAccount from './ChatAccount';
import ChatInfo from './ChatInfo';
import "../../scss/chat.scss"
import Inbox from './Inbox';
import OnlineNow from './OnlineNow';
import {Outlet} from 'react-router-dom'

export default function ChatLayout () {

    return ((
        <div className="chat_container">
            <ChatAccount />
            <div className="chat_list">
                <OnlineNow />
                <Inbox />
            </div>
            <Outlet />
        </div>
    ));
}
