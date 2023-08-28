import React, { useContext } from 'react';
import { SocketContext } from './ChatRooms';
import ChannelInitAction from "./ChannelInitAction"

export default function ChatRoomWindow({messagesElements, setNotif}) {
    const {id, outerDiv, innerDiv, isBanned} = useContext(SocketContext)
    if (!id) {
        return (
            <section className={`chat_window bg-chat-body ${isBanned ? 'bg-black opacity-20' : ''}`} ref={outerDiv} style={{position: 'relative', height: '100%', overflowY: 'scroll'}}>
                <div className="w-full h-full flex justify-center items-center" ref={innerDiv} style={{position: 'relative'}}>
                    <ChannelInitAction setNotif={setNotif} />
                </div>
            </section>
        )
    }
    return (
        <section className={`chat_window bg-chat-body ${isBanned ? 'bg-black opacity-20' : ''}`} ref={outerDiv} style={{position: 'relative', height: '100%', overflowY: 'scroll'}}>
            <div ref={innerDiv} style={{position: 'relative'}}>
                {messagesElements}
            </div>
        </section>
    )
}