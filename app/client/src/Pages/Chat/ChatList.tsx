import React from 'react'
import Inbox from './Inbox';
import OnlineNow from './OnlineNow';

export default function ChatList () {
    return (<div className="chat_list">
        <OnlineNow />
        <Inbox />
    </div>);
}