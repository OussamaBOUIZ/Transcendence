import React from 'react';


export default function ChatInput({message, setMessage, sender}) {
    function handleEnter(event) {
        if (event.key === 'Enter') sender(event)
    }

    return (
        <form className="chat_input" onSubmit={sender}>
            <textarea
            placeholder="Type something"
            onKeyDown={handleEnter}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button className='bg-primary-pink' type="submit">Send</button>
        </form>
    )
}