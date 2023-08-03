import React from 'react'
import ChatHeader from './ChatHeader';
import {io} from 'socket.io-client'


export default function ChatMain () {
    const [currentMessage, setCurrentMessage] = React.useState("")
    // const [currentMessageObj, setCurrentMessageObj] = React.useState({
    //     userId: ,
    //     creationDate:null,
    //     message: ""
    // })

    const [receivedMessage , setReceivedMessage] = React.useState("")
    const socket= React.useRef()

    function handleSubmit(e: React.SyntheticEvent<EventTarget>): void {

        e.preventDefault()
        console.log(currentMessage)
        setCurrentMessage("")
    }

    function handleChange(e: React.SyntheticEvent<EventTarget>):void {
        setCurrentMessage(e.target.value)
    }

    React.useEffect(() => {
        socket.current = io("ws://localhost:1313");
        socket.current.emit("SendMessage")
        socket.current.on("message", (data) => {
            console.log(data)
            setReceivedMessage(data.msg);
            console.log(receivedMessage)
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
                    Hello how're you doingg
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