import React from 'react'
import ChatMainInit from './ChatMainInit';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';

export default function ChatMain () {

    return (
        <div className="chat_main">
             <ChatHeader />
             <ChatWindow />
            <ChatInput />
        </div>
    );
}