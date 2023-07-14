import React from 'react'
import ChatList from './ChatList';
import ChatOverview from './ChatOverview';
import ChatInput from './ChatInput';
import ChatMain from './ChatMain';
import ChatAccount from './ChatAccount';
import ChatInfo from './ChatInfo';
import "../../scss/chat.scss"

export default function Chat () {

    return ((
        <div className="chat_container">
            <ChatAccount />
            <ChatInfo />
            <ChatList />
            <ChatOverview />
            <ChatMain />
            {/* <ChatInput /> */}
        </div>
    ));
}