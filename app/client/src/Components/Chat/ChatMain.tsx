import React from 'react'
import ChatMainInit from './ChatMainInit';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';
// import io from 'socket.io-client'


// const socket = io.connect("http:://localhost:3001")

export default function ChatMain () {
    const [currentMessage, setCurrentMessage] = React.useState("")
    function handleSubmit(e) {
        e.preventDefault()
        console.log(e.target.value)
    }

    function handleChange(e) {
        setCurrentMessage(e.target.value)
    }

    return (
        <div className="chat_main">
             <ChatHeader 
             username="ELEGANT TOM"
             online={true}
             />
             <section className="chat_window">
            <div className="message_bubble">
                Hello how're you doing
            </div>
        </section>
             <form className="chat_input" onSubmit={handleSubmit}>
                <textarea 
                placeholder="Type something"
                onChange={handleChange}
                value={currentMessage}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}