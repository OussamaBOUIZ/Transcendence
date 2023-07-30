import React from 'react'
import ChatMainInit from './ChatMainInit';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';


export default function ChatMain () {
    

    return (
        <div className="chat_main">
             <ChatHeader />
             <section className="chat_window">
            <div className="message_bubble">
                Hello how're you doing
            </div>
        </section>
             <form className="chat_input">
                <input type="text" placeholder='Type something'/>
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}