import React from 'react'
import ChatMainInit from './ChatMainInit';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';
import {io} from 'socket.io-client'


// const socket: any = io.connect("http:://localhost:1313")
// const socket = io("http:://localhost:1313")
export default function ChatMain () {
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [receivedMessage , setReceivedMessage] = React.useState("")
    const socket= React.useRef()

    function handleSubmit(e) {

        e.preventDefault()
        console.log(e.target.value)
    }
    function handleChange(e) {
        setCurrentMessage(e.target.value)
    }

    React.useEffect(() => {
        socket.current = io("ws://localhost:1313");
        socket.current.emit("SendMessage", "j")
        socket.current.on("message", (data) => {
            console.log(data)
            setReceivedMessage(data.msg);
            // console.log("-----------------")
            console.log(receivedMessage)
            // console.log("-----------------")
        });
    }, []);

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