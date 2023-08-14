import React from 'react'
import ChatHeader from './ChatHeader';
import {io} from 'socket.io-client'
import {MessageData} from "../../../../global/Interfaces"


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
        socket.current.on("message", (inMessage: string) => {
            console.log(inMessage)
            setReceivedMessage(inMessage);
            // 
        });
    }, []);

    return (
        <div className="chat_main">
             <ChatHeader 
             username="ELEGANT TOM"
             online={true}
             />

             <section className="chat_window">
                
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