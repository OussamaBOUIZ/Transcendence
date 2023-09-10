import React, { useContext } from 'react';
import InboxContext from '../../Context/InboxContext';


export default function ChatInput({message, setMessage, sender, id}: {message: string, setMessage: React.Dispatch<React.SetStateAction<string>>, sender: React.FormEventHandler<HTMLElement>, id:string | undefined}) {
    // const {id} = useContext(SocketContext)
    const {isBanned} = useContext(InboxContext)
    const handleEnter:React.KeyboardEventHandler<HTMLElement> = (event) => {
        if (event.key === 'Enter') sender(event)
    }

    if (!id)
        return null

    return (
        <form className="chat_input" onSubmit={sender}>
            <textarea
                autoFocus
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