import React, { useContext } from 'react';
import { SocketContext } from './ChatRooms';


export default function ChatInput({message, setMessage, sender}) {
    const {id, isBanned} = useContext(SocketContext)
    function handleEnter(event) {
        if (event.key === 'Enter') sender(event)
    }

    if (!id) {
        return (
            <form className="chat_input" onSubmit={sender}></form>
        )
    }

    return (
        <form className="chat_input" onSubmit={sender}>
            <textarea
                placeholder={`${isBanned ? 'You have been banned from this channel' : 'Type something'}`}
                className={`overflow-hidden resize-none ${isBanned ? 'cursor-not-allowed pointer-events-none' : ''}`}
                onKeyDown={handleEnter}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`bg-primary-pink ${isBanned ? 'cursor-not-allowed pointer-events-none' : ''}`} type="submit">Send</button>
        </form>
    )
}