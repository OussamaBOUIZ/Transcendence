import React, { useContext } from 'react';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';


export default function ChatInput({message, setMessage, sender, id}: {message: string, setMessage: React.Dispatch<React.SetStateAction<string>>, sender: React.FormEventHandler<HTMLElement>, id:string | undefined}) {
    const {dmSocket, isBanned, isTyping} = useContext(InboxContext)
    const handleEnter:React.KeyboardEventHandler<HTMLElement> = (event) => {
        if (event.key === 'Enter') sender(event)
    }

    useEffectOnUpdate(() => {
        if (message.length)
            dmSocket?.emit('pandingMessage', id)
        else
            dmSocket?.emit('noMessage', id)
    }, [message])

    if (!id)
        return null

    console.log(isTyping);

    return (
        <form className="chat_input px-4 flex flex-col" onSubmit={sender}>
            {isTyping && <div className="loader flex gap-4">
                <p>is typing</p>
                <span></span>
                <span></span>
                <span></span>
            </div>}
            <div className='flex items-center justify-center'>
                <textarea
                    autoFocus
                    placeholder={`${isBanned ? 'You have been banned from this channel' : 'Type something'}`}
                    className={`overflow-hidden resize-none ${isBanned ? 'cursor-not-allowed pointer-events-none' : ''}`}
                    onKeyDown={handleEnter}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                <button
                    className={`bg-primary-pink ${isBanned ? 'cursor-not-allowed pointer-events-none' : ''}`}
                    type="submit"
                    disabled={isBanned || !message.trim()}
                    >
                    Send
                </button>
            </div>
        </form>
    )
}