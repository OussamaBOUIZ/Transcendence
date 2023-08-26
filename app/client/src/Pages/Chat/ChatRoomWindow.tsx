import React, { useContext } from 'react';
import { SocketContext } from './ChatRooms';

export default function ChatRoomWindow({messagesElements}) {
    const {outerDiv, innerDiv} = useContext(SocketContext)
    return (
        <section className="chat_window bg-chat-body" ref={outerDiv} style={{position: 'relative', height: '100%', overflowY: 'scroll'}}>
            <div ref={innerDiv} style={{position: 'relative'}}>
                {messagesElements}
            </div>
        </section>
    )
}